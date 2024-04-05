import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { orders } from './orders.ts';

export const rewards = sqliteTable('rewards', {
    id: integer('id').primaryKey(),
    amount: integer('amount').notNull(),
    orderId: integer('order_id')
        .references(() => orders.id)
        .notNull(),
});

export const rewardsRelations = relations(rewards, ({ one }) => ({
    orders: one(orders, {
        fields: [rewards.orderId],
        references: [orders.id],
    }),
}));
