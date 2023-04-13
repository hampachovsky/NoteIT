import 'dotenv/config';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
const userExtractor = (req, res, next) => {
    try {
        if (!req.token) return res.status(401).json({ error: 'invalid token' });
        const decodedData = jwt.verify(req.token, process.env.SECRET_KEY);
        if (!decodedData) return res.status(401).json({ error: 'invalid data' });
        req.user = decodedData;
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'authorization error' });
    }
};

export default userExtractor;
