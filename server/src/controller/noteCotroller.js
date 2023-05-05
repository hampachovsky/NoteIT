import User from '../models/User.js';
import Note from '../models/Note.js';

const noteController = {
    async getAll(req, res) {
        try {
            const userFromToken = req.user;
            const user = await User.findById(userFromToken._id);
            if (!user) {
                return res.status(500).json({ error: 'User from token not found' });
            }
            let notes = await Note.find({ author: user._id });
            notes = notes.sort((a, b) => new Date(b.noteDate) - new Date(a.noteDate));
            return res.status(200).json(notes);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ error: 'failed  take note' });
        }
    },
    async getById(req, res) {
        const { id } = req.params;
        try {
            const note = await Note.findById(id);
            if (!note) return res.status(500).json({ error: 'Note not found' });
            return res.status(200).json(note);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ error: 'failed  take note' });
        }
    },
    async getBy(req, res) {
        try {
            const userFromToken = req.user;
            const user = await User.findById(userFromToken._id);
            if (!user) {
                return res.status(500).json({ error: 'User from token not found' });
            }
            let notes = await Note.find({ author: user._id }, { tasks: 0 });
            const { type, date, queryString } = req.query;
            if (queryString) {
                const regexQuery = {
                    author: user._id,
                    title: new RegExp(req.query.queryString, 'i'),
                };
                notes = await Note.find(regexQuery, { tasks: 0 });
            }
            if (type === 'minor' || type === 'warning' || type === 'important') {
                notes = notes.filter((note) => note.noteType === type);
            }
            if (date === 'earliest') {
                notes = notes.sort((a, b) => new Date(a.noteDate) - new Date(b.noteDate));
            } else if (date === 'newest') {
                notes = notes.sort((a, b) => new Date(b.noteDate) - new Date(a.noteDate));
            }
            return res.status(200).json(notes);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: 'failed take notes' });
        }
    },
    async create(req, res) {
        const { body } = req;
        const userFromToken = req.user;
        if (!(body.title || body.content)) {
            return res.status(400).json({ error: 'Title or content not provided' });
        }
        let userWhoArchive;
        try {
            userWhoArchive = await User.findById(userFromToken._id);
        } catch (e) {
            res.status(500).json({ error: 'Provided user is not found' });
        }
        if (!userWhoArchive) {
            return res.status(500).json({ error: 'User from token not found' });
        }
        const noteToAdd = {
            title: body.title,
            content: body.content,
            author: userWhoArchive._id,
            noteDate: body.noteDate,
            noteType: body.noteType,
        };
        let savedNote;
        try {
            savedNote = await (
                await new Note({ ...noteToAdd }).save()
            ).populate({
                path: 'author',
                select: 'username',
            });
        } catch (e) {
            return res.status(500).json({ error: 'User from token not found' });
        }
        try {
            await User.findByIdAndUpdate(userWhoArchive._id, {
                ...userWhoArchive,
                notes: userWhoArchive.notes.push(savedNote._id),
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ error: 'User update while creating note unsuccessfull' });
        }

        return res.status(200).json(savedNote);
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { body } = req;
            if (!id) {
                res.status(400).json({ error: 'Id missed' });
            }
            if (!(body.title || body.content)) {
                return res.status(400).json({ error: 'Title or content not provided' });
            }
            if (
                !!body.noteType &&
                body.noteType !== 'minor' &&
                body.noteType !== 'warning' &&
                body.noteType !== 'important'
            ) {
                return res.status(400).json({ error: 'Incorrect note type' });
            }
            const updatedNote = await Note.findByIdAndUpdate(id, body, { new: true });
            const note = await Note.findById(updatedNote._id, { tasks: 0 });
            return res.status(200).json(note);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Update note error' });
        }
    },
    async delete(req, res) {
        try {
            const noteId = req.params.id;
            const userFromToken = req.user;
            const user = await User.findById(userFromToken._id);
            if (!user) {
                return res.status(500).json({ error: 'User from token not found' });
            }
            if (!noteId) return res.status(400).json({ error: 'Note id not provided' });

            user.notes = user.notes.filter((e) => e._id.toString() !== noteId);
            user.archivedNotes = user.archivedNotes.filter((e) => e._id.toString() !== noteId);
            await user.save();
            await Note.findByIdAndRemove(noteId);
            return res.status(200).json(null);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: 'failed create note' });
        }
    },
    async archive(req, res) {
        const noteId = req.params.id;
        const userFromToken = req.user;
        let userWhoArchive;
        try {
            userWhoArchive = await User.findById(userFromToken._id);
        } catch (e) {
            res.status(500).json({ error: 'Provided user is not found' });
        }
        if (!userWhoArchive) {
            return res.status(500).json({ error: 'User from token not found' });
        }
        if (userWhoArchive.archivedNotes.includes(noteId)) {
            return res.status(500).json({ error: 'This note already archived' });
        }
        try {
            await User.findByIdAndUpdate(userWhoArchive._id, {
                ...userWhoArchive,
                archivedNotes: userWhoArchive.archivedNotes.push(noteId),
            });
        } catch (e) {
            console.log(e);
            return res
                .status(500)
                .json({ error: 'User update while archiving note unsuccessfull' });
        }

        return res.status(200).json(userWhoArchive);
    },
    async unArchive(req, res) {
        const noteId = req.params.id;
        const userFromToken = req.user;
        let userWhoArchive;
        try {
            userWhoArchive = await User.findById(userFromToken._id);
        } catch (e) {
            res.status(500).json({ error: 'Provided user is not found' });
        }
        if (!userWhoArchive) {
            return res.status(500).json({ error: 'User from token not found' });
        }
        try {
            userWhoArchive.archivedNotes = userWhoArchive.archivedNotes.filter(
                (e) => e._id.toString() !== noteId,
            );
            userWhoArchive.save();
        } catch (e) {
            console.log(e);
            return res
                .status(500)
                .json({ error: 'User update while unarchiving note unsuccessfull' });
        }

        return res.status(200).json(userWhoArchive);
    },
};

export default noteController;
