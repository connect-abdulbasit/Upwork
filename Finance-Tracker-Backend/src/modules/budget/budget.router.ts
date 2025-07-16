import { Router, Response } from 'express';
import { db, schema } from '../../../database';
import { eq } from 'drizzle-orm';
import VerifyUserJWT from '../../middleware/AuthJWT';
import { AuthenticatedRequest } from '../../types';
import { createBudget, getUserBudgets } from './budget.service';

const router = Router();

router.post('/', VerifyUserJWT, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { name, amount, period, categoryId, startDate, endDate } = req.body;
    const userId = req.user!.userId;

    const result = await createBudget(userId, { name, amount, period, categoryId, startDate, endDate });

    res.status(201).json({ msg: 'Budget created', result });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create budget' });
  }
});

router.get('/', VerifyUserJWT, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const budgets = await getUserBudgets(userId);

    res.json(budgets);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch budgets' });
  }
});

export default router;
