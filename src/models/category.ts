import { categories } from '../schema/categories.ts';

export type Category = typeof categories.$inferSelect;
