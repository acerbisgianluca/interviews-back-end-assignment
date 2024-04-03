import { Elysia } from 'elysia';
import { products } from './controllers/products.ts';
import { categories } from './controllers/category.ts';

const app = new Elysia({ prefix: '/api' }).use(products).use(categories).listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
