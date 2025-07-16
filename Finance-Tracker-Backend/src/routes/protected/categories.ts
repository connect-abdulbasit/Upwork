import { Router, Request, Response } from 'express';
import { db, schema } from '../../../database';
import { eq } from 'drizzle-orm';
import VerifyUserJWT from '../../middleware/AuthJWT';
import { AuthenticatedRequest } from '../../types';

const router = Router();

router.post('/', VerifyUserJWT, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { name, description, color } = req.body;
    const userId = req.user!.userId;

    const result = await db.insert(schema.categories).values({
      name,
      description,
      color,
      userId,
    });

    res.status(201).json({ msg: 'Category created', result });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create category' });
  }
});

router.get('/', VerifyUserJWT, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const categories = await db.query.categories.findMany({
      where: eq(schema.categories.userId, userId),
    });

    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch categories' });
  }
});

export default router;
