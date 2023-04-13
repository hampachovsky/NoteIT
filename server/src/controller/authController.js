import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authController = {
    async register(req, res) {
        try {
            const { username, password } = req.body;
            if (username.length < 4 || username.length > 32) {
                return res
                    .status(400)
                    .json({ error: 'Username must be greater than 3 and less than 32 characters' });
            }
            if (password.length <= 4 || password.length > 64) {
                return res
                    .status(400)
                    .json({ error: 'Password must be greater than 4 and less than 32 characters' });
            }
            const candidate = await User.findOne({ username });
            if (candidate) return res.status(409).json({ error: 'Username taken' });
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = await bcrypt.hashSync(password, salt);
            const user = new User({ username, password: passwordHash });
            await user.save();
            return res.status(200).json('registrations success');
        } catch (e) {
            console.log(e);
            return res.status(400).json({ error: 'Registration error' });
        }
    },
    async login(req, res) {
        try {
            const { username, password, rememberMe } = req.body;
            if (!(password || username))
                return res.status(500).json({ error: 'User data missing' });
            const user = await User.findOne({ username });
            if (!user) return res.status(404).json({ error: 'User not found' });
            const validPassword = await bcrypt.compareSync(password, user.password);
            if (!validPassword)
                return res.status(401).json({ error: 'Invalid username or password' });
            const userForToken = {
                username: user.username,
                _id: user._id,
            };
            const token = jwt.sign(userForToken, process.env.SECRET_KEY, {
                expiresIn: rememberMe ? '365d' : '10h',
            });
            return res.status(200).json({ token, user });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ error: 'Authorization error' });
        }
    },
    async getById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) res.status(404).json({ error: 'User not found' });
            return res.status(200).json(user);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ error: 'failed  take user' });
        }
    },
    async getMe(req, res) {
        try {
            const userFromToken = req.user;
            const user = await User.findById(userFromToken._id).populate('notes');
            return res.status(200).json(user);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ error: 'failed  take user' });
        }
    },
    async getAll(req, res) {
        try {
            const users = await User.find();
            return res.status(200).json(users);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ error: 'failed  take user' });
        }
    },
};

export default authController;
