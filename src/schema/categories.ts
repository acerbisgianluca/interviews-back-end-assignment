import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { products } from './products.ts';

export const categories = sqliteTable('categories', {
    id: integer('id').primaryKey(),
    name: text('name').notNull().unique(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
    products: many(products),
}));
