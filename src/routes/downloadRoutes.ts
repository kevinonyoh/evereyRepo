import { Router} from 'express';
import { downloadArticle } from '../controllers/downloadController';

const router = Router();

router.get('/:id/download', downloadArticle);

export default router;
