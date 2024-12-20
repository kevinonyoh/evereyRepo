import { Router } from 'express';
import { getStep, updateStep } from '../controllers/stepFlowController';

const router = Router();

// Route to fetch steps
router.get('/step', getStep);

// Route to update a specific step by ID
router.put('/step/:id', updateStep);

export default router;