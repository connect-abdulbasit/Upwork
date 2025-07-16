import { db, schema } from '../../../database';
import { eq } from 'drizzle-orm';

export async function createBudget(userId: number, data: any) {
  return db.insert(schema.budgets).values({ ...data, userId });
}

export async function getUserBudgets(userId: number) {
  return db.query.budgets.findMany({ where: eq(schema.budgets.userId, userId) });
}
