import { Elysia } from 'elysia';
import { productController } from './controllers/product.ts';
import { categoryController } from './controllers/category.ts';
import { orderController } from './controllers/order.ts';
import { rewardController } from './controllers/reward.ts';
import { createErrorResponseData } from './models/response.ts';

export const app = new Elysia({ prefix: '/api' })
    .onError(({ error, code, set }) => {
        console.error('Global error handler:', error);

        if (code === 'UNKNOWN') {
            set.status = 500;
        } else {
            set.status = error.status;
        }

        return createErrorResponseData(error);
    })
    .use(productController)
    .use(categoryController)
    .use(orderController)
    .use(rewardController)
    .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
