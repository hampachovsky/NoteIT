import User from '../models/User.js';
import Note from '../models/Note.js';

const noteController = {
    async getAll(req, res) {
        try {
            let notes = await Note.find().populate({ path: 'author', select: 'username' });
            notes = notes.sort((a, b) => new Date(b.created) - new Date(a.created));
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
    async create(req, res) {
        const { body } = req;
        const userFromToken = req.user;
        if (!(body.title || body.content)) {
            return res.status(400).json({ error: 'Title or content not provided' });
        }
        let userWhoAdds;
        try {
            userWhoAdds = await User.findById(userFromToken._id);
        } catch (e) {
            res.status(500).json({ error: 'Provided user is not found' });
        }
        if (!userWhoAdds) {
            return res.status(500).json({ error: 'User from token not found' });
        }
        const noteToAdd = {
            title: body.title,
            content: body.content,
            author: userWhoAdds._id,
            tags: body.tags,
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
            await User.findByIdAndUpdate(userWhoAdds._id, {
                ...userWhoAdds,
                notes: userWhoAdds.notes.push(savedNote._id),
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
            await user.save();
            await Note.findByIdAndRemove(noteId);
            return res.status(200).json(null);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: 'failed create note' });
        }
    },
};

export default noteController;
