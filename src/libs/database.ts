import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as products from '../schema/products.ts';
import * as categories from '../schema/categories.ts';
import * as orders from '../schema/orders.ts';
import * as ordersToProducts from '../schema/ordersToProducts.ts';
import * as rewards from '../schema/rewards.ts';
import * as discounts from '../schema/discounts.ts';

const sqlite = new Database(Bun.env['SQLITE_FILE_PATH']);
export const db = drizzle(sqlite, {
    schema: {
        ...products,
        ...categories,
        ...orders,
        ...ordersToProducts,
        ...rewards,
        ...discounts,
    },
});
