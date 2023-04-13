import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        minLength: 2,
    },
    noteType: {
        type: String,
        enum: ['minor', 'important', 'warning'],
        default: 'minor',
    },
    noteDate: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

NoteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject.createdAt;
        delete returnedObject.author;
    },
});

const Note = mongoose.model('Note', NoteSchema);

export default Note;
