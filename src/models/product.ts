import { products } from '../schema/products.ts';

export type Product = typeof products.$inferSelect;
