import { Router, Response } from 'express';
import VerifyUserJWT from '../../middleware/AuthJWT';
import { AuthenticatedRequest } from '../../types';
import { createCategory, getUserCategories } from './categories.service';

const router = Router();

router.post('/', VerifyUserJWT, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { name, description, color } = req.body;
    const userId = req.user!.userId;

    const result = await createCategory(userId, { name, description, color });

    res.status(201).json({ msg: 'Category created', result });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create category' });
  }
});

router.get('/', VerifyUserJWT, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const categories = await getUserCategories(userId);

    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch categories' });
  }
});

export default router;
