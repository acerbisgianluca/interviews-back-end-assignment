import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as products from '../schema/products.ts';
import * as categories from '../schema/categories.ts';
import * as orders from '../schema/orders.ts';
import * as ordersToProducts from '../schema/ordersToProducts.ts';

const sqlite = new Database('data/sqlite.db');
export const db = drizzle(sqlite, {
    schema: { ...products, ...categories, ...orders, ...ordersToProducts },
});
