import { db, schema } from '../../../database';
import { eq } from 'drizzle-orm';

export async function createCategory(userId: number, data: any) {
  return db.insert(schema.categories).values({ ...data, userId });
}

export async function getUserCategories(userId: number) {
  return db.query.categories.findMany({ where: eq(schema.categories.userId, userId) });
}