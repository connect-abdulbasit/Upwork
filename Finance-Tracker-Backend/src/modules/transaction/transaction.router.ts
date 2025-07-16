import { Router, Response } from 'express';
import VerifyUserJWT from '../../middleware/AuthJWT';
import { AuthenticatedRequest } from '../../types';
import { createTransaction, getUserTransactions, updateTransaction, deleteTransaction } from './transaction.service';

const router = Router();

router.post('/', VerifyUserJWT, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { amount, description, type, categoryId, transactionDate } = req.body;
    const userId = req.user!.userId;

    const result = await createTransaction(userId, { amount, description, type, categoryId, transactionDate });

    res.status(201).json({ msg: 'Transaction created', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to create transaction' });
  }
});

router.get('/', VerifyUserJWT, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    const transactions = await getUserTransactions(userId);

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch transactions' });
  }
});

router.put('/:id', VerifyUserJWT, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const updated = await updateTransaction(Number(id), req.body);

    res.json({ msg: 'Transaction updated', updated });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update transaction' });
  }
});

router.delete('/:id', VerifyUserJWT, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await deleteTransaction(Number(id));

    res.json({ msg: 'Transaction deleted', deleted });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete transaction' });
  }
});

export default router;