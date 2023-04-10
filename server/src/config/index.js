import 'dotenv/config';

const PORT = process.env.PORT || 5000;

const { MONGODB_URI } = process.env;

export { PORT, MONGODB_URI };
