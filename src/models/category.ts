import { categories } from '../schema/categories.ts';
import { createSelectSchema } from 'drizzle-typebox';
import { type Static, t } from 'elysia';

export const categorySchema = createSelectSchema(categories);
export const categoryWithProductStockQuantitySchema = t.Composite([
    categorySchema,
    t.Object({ numOfProducts: t.Number({ minimum: 0 }) }),
]);

export type CategoryWithProductStockQuantity = Static<
    typeof categoryWithProductStockQuantitySchema
>;
