import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { MONGODB_URI, PORT } from './src/config/index.js';
import tokenExtractor from './src/middlewares/tokenExtractor.js';
import unknownEndpoint from './src/middlewares/unknowEndpoint.js';
import router from './src/routes/index.js';

// basic configuration
const app = express();
app.use(express.json());
app.use(cors());
app.use(tokenExtractor);

app.use('/api', router);

// if routes not found
app.use(unknownEndpoint);

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
