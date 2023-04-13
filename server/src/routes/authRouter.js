import Router from 'express';
import authController from '../controller/authController.js';
import userExtractor from '../middlewares/userExtractor.js';

const router = new Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', userExtractor, authController.getMe);
router.get('/all', authController.getAll);
router.get('/:id', authController.getById);

export default router;
