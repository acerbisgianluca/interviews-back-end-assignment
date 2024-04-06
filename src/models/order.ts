import { type Static, t } from 'elysia';
import { cardDetailsSchema } from './payment.ts';
import { orders } from '../schema/orders.ts';
import { createSelectSchema } from 'drizzle-typebox';

export const orderSchema = createSelectSchema(orders);
export const cartItemSchema = t.Object({
    productId: t.Numeric(),
    quantity: t.Numeric({ minimum: 1 }),
});
export const createOrderRequestData = t.Object({
    items: t.Array(cartItemSchema, { minItems: 1 }),
    rewardPoints: t.Optional(t.Numeric({ minimum: 0 })),
    cardDetails: cardDetailsSchema,
});

export type Order = typeof orders.$inferSelect;
export type CartItem = Static<typeof cartItemSchema>;
