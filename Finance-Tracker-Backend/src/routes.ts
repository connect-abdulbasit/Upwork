// src/routes.ts
import { Express } from 'express';
import authRoutes from './modules/auth/auth.router';
import transactionRoutes from './modules/transaction/transaction.router';
import categoryRoutes from './modules/categories/categories.router';
import budgetRoutes from './modules/budget/budget.router';

export function Routes(app: Express) {
  app.use('/api/auth', authRoutes);
  app.use('/api/transactions', transactionRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/budgets', budgetRoutes);
}
