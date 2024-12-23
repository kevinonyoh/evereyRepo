import { Router } from 'express';
import { uploadFile } from '../controllers/fileController'; 
import { auth } from '../middleware/auth';

const router = Router();

router.post('/upload', auth, uploadFile);

export default router;