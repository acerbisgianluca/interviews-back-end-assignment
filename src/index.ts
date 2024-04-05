import { Elysia } from 'elysia';
import { products } from './controllers/products.ts';
import { categories } from './controllers/category.ts';
import { orders } from './controllers/order.ts';
import { rewards } from './controllers/reward.ts';

const app = new Elysia({ prefix: '/api' })
    .use(products)
    .use(categories)
    .use(orders)
    .use(rewards)
    .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
