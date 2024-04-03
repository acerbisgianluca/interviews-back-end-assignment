import { text, integer, sqliteTable, real } from 'drizzle-orm/sqlite-core';
import { categories } from './categories.ts';
import { relations } from 'drizzle-orm';

export const products = sqliteTable('products', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    imageUrl: text('image_url'),
    price: real('price').notNull(),
    quantity: integer('quantity').notNull(),
    category: integer('category_id')
        .references(() => categories.id)
        .notNull(),
});

export const productsRelations = relations(products, ({ one }) => ({
    category: one(categories, {
        fields: [products.category],
        references: [categories.id],
    }),
}));
