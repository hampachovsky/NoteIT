import Router from 'express';
import authRouter from './authRouter.js';
import noteRouter from './noteRouter.js';

const router = new Router();

router.use('/auth', authRouter);
router.use('/notes', noteRouter);

export default router;
