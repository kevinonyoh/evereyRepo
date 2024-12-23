import { Router } from 'express';
import { getStep, updateStep } from '../controllers/stepFlowController';
import { auth } from '../middleware/auth';

const router = Router();

// Route to fetch steps
router.get('/step', auth, getStep);

// Route to update a specific step by ID
router.put('/step/:id', auth, updateStep);

export default router;