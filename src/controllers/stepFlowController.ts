import { NextFunction, Request, Response } from 'express';
import Step from '../models/step';

// Get all steps
export const getStep = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stepIds = req.query.ids ? (req.query.ids as string).split(',') : [];
        const steps = await Step.findAll({
            where: {
            id: stepIds
            }
        });
        console.log("Fetched Steps with IDs:", steps.map(step => step.id));
        res.status(200).json(steps);
    } catch (error) {
        console.error("Error fetching steps:", error);
        res.status(500).json({ error: 'Failed to fetch steps' });
    }
};


// Update a step by ID
export const updateStep = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, status } = req.body;

    console.log("Attempting to update Step with ID:", id);

    try {
        const step = await Step.findByPk(id);

        if (!step) {
            console.log("No step found with ID:", id);
            return res.status(404).json({ error: 'Step not found' });
        }

        // Update fields only if provided in request body
        step.name = name || step.name;
        step.status = status || step.status;
        await step.save();

        console.log("Updated Step:", step);
        res.status(200).json(step);
    } catch (error) {
        console.error("Error updating step:", error);
        res.status(500).json({ error: 'Failed to update step' });
    }
};



