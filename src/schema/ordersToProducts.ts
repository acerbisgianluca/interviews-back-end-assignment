import { integer, sqliteTable, primaryKey } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { products } from './products.ts';
import { orders } from './orders.ts';

export const ordersToProducts = sqliteTable(
    'orders_to_products',
    {
        productId: integer('product_id').notNull(),
        orderId: integer('order_id').notNull(),
        quantity: integer('quantity').notNull(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.productId, t.orderId] }),
    }),
);

export const ordersToProductsRelations = relations(ordersToProducts, ({ one }) => ({
    product: one(products, {
        fields: [ordersToProducts.productId],
        references: [products.id],
    }),
    order: one(orders, {
        fields: [ordersToProducts.orderId],
        references: [orders.id],
    }),
}));
