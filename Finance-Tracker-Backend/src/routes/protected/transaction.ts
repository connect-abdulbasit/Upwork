import { Router, Response } from 'express';
import { db, schema } from '../../../database';
import { eq } from 'drizzle-orm';
import VerifyUserJWT from '../../middleware/AuthJWT';
import { AuthenticatedRequest } from '../../types';

const router = Router();

// Create a transaction
router.post('/', VerifyUserJWT, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { amount, description, type, categoryId, transactionDate } = req.body;
    const userId = req.user!.userId;

    const result = await db.insert(schema.transactions).values({
      amount,
      description,
      type,
      categoryId,
      userId,
      transactionDate,
    });

    res.status(201).json({ msg: 'Transaction created', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to create transaction' });
  }
});

// Get all transactions
router.get('/', VerifyUserJWT, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    const transactions = await db.query.transactions.findMany({
      where: eq(schema.transactions.userId, userId),
    });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch transactions' });
  }
});

// Update a transaction
router.put('/:id', VerifyUserJWT, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const updated = await db.update(schema.transactions)
      .set(req.body)
      .where(eq(schema.transactions.id, Number(id)));

    res.json({ msg: 'Transaction updated', updated });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update transaction' });
  }
});

// Delete a transaction
router.delete('/:id', VerifyUserJWT, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await db.delete(schema.transactions).where(eq(schema.transactions.id, Number(id)));

    res.json({ msg: 'Transaction deleted', deleted });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete transaction' });
  }
});

export default router;