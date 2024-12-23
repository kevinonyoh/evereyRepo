import { Router} from 'express';
import { downloadArticle } from '../controllers/downloadController';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/:id/download', auth, downloadArticle);

export default router;
