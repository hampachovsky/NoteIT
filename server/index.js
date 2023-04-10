import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { MONGODB_URI, PORT } from './src/config/index.js';

// basic configuration
const app = express();
app.use(express.json());
app.use(cors());

// TODO: ADD router here

// TODO: ADD if routes not found

async function startApp() {
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}!`);
        });
    } catch (e) {
        console.error(e);
    }
}

startApp();
