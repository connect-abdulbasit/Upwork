import { db, schema } from '../../../database';
import { eq } from 'drizzle-orm';

export async function createTransaction(userId: number, data: any) {
  return db.insert(schema.transactions).values({ ...data, userId });
}

export async function getUserTransactions(userId: number) {
  return db.query.transactions.findMany({ where: eq(schema.transactions.userId, userId) });
}

export async function updateTransaction(id: number, data: any) {
  return db.update(schema.transactions).set(data).where(eq(schema.transactions.id, id));
}

export async function deleteTransaction(id: number) {
  return db.delete(schema.transactions).where(eq(schema.transactions.id, id));
}
