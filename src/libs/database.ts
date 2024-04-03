import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import type { SQLiteSelect } from 'drizzle-orm/sqlite-core';
import * as products from '../schema/products.ts';
import * as categories from '../schema/categories.ts';

const sqlite = new Database('data/sqlite.db');
export const db = drizzle(sqlite, { schema: { ...products, ...categories } });

export const withPagination = <T extends SQLiteSelect>(
    query: T,
    page: number,
    pageSize: number,
) => {
    return query.limit(pageSize).offset(page * pageSize);
};
