import { integer, sqliteTable, real, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { ordersToProducts } from './ordersToProducts.ts';

export const orders = sqliteTable('orders', {
    id: integer('id').primaryKey(),
    amount: real('amount').notNull(),
    transactionId: text('transactionId').notNull(),
});

export const ordersRelations = relations(orders, ({ many }) => ({
    ordersToProducts: many(ordersToProducts),
}));
