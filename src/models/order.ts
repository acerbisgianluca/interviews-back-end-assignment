import { type Static, t } from 'elysia';
import { cardDetails } from './payment.ts';
import { orders } from '../schema/orders.ts';

export type Order = typeof orders.$inferSelect;

const cartItem = t.Object({
    productId: t.Numeric({ minimum: 0 }),
    quantity: t.Numeric({ minimum: 1 }),
});

export type CartItem = Static<typeof cartItem>;

export const orderRequestBody = t.Object({
    items: t.Array(cartItem, { minItems: 1 }),
    cardDetails,
});
