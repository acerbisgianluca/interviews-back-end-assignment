import { products } from '../schema/products.ts';
import { type Static, t } from 'elysia';
import { createSelectSchema } from 'drizzle-typebox';
import { paginationOptions } from './pagination.ts';

export const productSchema = createSelectSchema(products);
export const productFilterOptions = t.Partial(
    t.Object({
        cid: t.Numeric({ minimum: 0 }),
        q: t.String({ minLength: 1 }),
    }),
);
export const getProductByIdParamSchema = t.Object({
    productId: t.Numeric(),
});
export const getAllProductsQuerySchema = t.Composite([paginationOptions, productFilterOptions]);

export type Product = typeof products.$inferSelect;
export type ProductFilterOptions = Static<typeof productFilterOptions>;
