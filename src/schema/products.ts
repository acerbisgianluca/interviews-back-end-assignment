import { text, integer, sqliteTable, real } from 'drizzle-orm/sqlite-core';
import { categories } from './categories.ts';
import { relations } from 'drizzle-orm';
import { ordersToProducts } from './ordersToProducts.ts';
import { discounts } from './discounts.ts';

export const products = sqliteTable('products', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    imageUrl: text('image_url'),
    price: real('price').notNull(),
    stockQuantity: integer('stock_quantity').notNull(),
    category: integer('category_id')
        .references(() => categories.id)
        .notNull(),
    extraRewardPoints: integer('extra_reward_points').notNull().default(0),
});

export const productsRelations = relations(products, ({ one, many }) => ({
    category: one(categories, {
        fields: [products.category],
        references: [categories.id],
    }),
    ordersToProducts: many(ordersToProducts),
    discounts: many(discounts),
}));
