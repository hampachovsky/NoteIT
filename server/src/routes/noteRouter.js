import Router from 'express';
import noteController from '../controller/noteCotroller.js';
import userExtractor from '../middlewares/userExtractor.js';

const router = new Router();

router.get('/all', userExtractor, noteController.getAll);
router.get('/:id', userExtractor, noteController.getById);
router.get('/', userExtractor, noteController.getBy);
router.post('/', userExtractor, noteController.create);
router.delete('/:id', userExtractor, noteController.delete);
router.put('/:id', noteController.update);
router.put('/archive/:id', userExtractor, noteController.archive);
router.put('/unarchive/:id', userExtractor, noteController.unArchive);

export default router;
