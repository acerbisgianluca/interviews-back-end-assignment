import { integer, sqliteTable, unique } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { products } from './products.ts';

export const discounts = sqliteTable(
    'discounts',
    {
        id: integer('id').primaryKey(),
        productId: integer('product_id')
            .references(() => products.id)
            .notNull(),
        amount: integer('amount').notNull(),
        startDate: integer('start_date', { mode: 'timestamp_ms' }).notNull(),
        endDate: integer('end_date', { mode: 'timestamp_ms' }).notNull(),
    },
    (t) => ({
        unq: unique().on(t.productId, t.startDate, t.endDate),
    }),
);

export const discountsRelations = relations(discounts, ({ one }) => ({
    product: one(products, {
        fields: [discounts.productId],
        references: [products.id],
    }),
}));
