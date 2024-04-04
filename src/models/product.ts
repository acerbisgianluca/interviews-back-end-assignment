import { products } from '../schema/products.ts';
import { type Static, t } from 'elysia';

export type Product = typeof products.$inferSelect;

export const productFilterOptions = t.Partial(
    t.Object({
        cid: t.Numeric({ minimum: 0 }),
        q: t.String({ minLength: 1 }),
    }),
);

export type ProductFilterOptions = Static<typeof productFilterOptions>;
