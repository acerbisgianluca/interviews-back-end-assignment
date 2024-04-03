import { Elysia } from 'elysia';
import { setup } from '../setup.ts';
import { ProductService } from '../services/product.ts';

export const products = new Elysia({
    name: 'Controller.Products',
    prefix: '/products',
})
    .use(setup)
    .get(
        '/',
        async ({ query: { offset, limit } }) => {
            const availableProducts = await ProductService.getAllAvailableProducts({
                offset,
                limit,
            });

            return {
                results: availableProducts,
                size: availableProducts.length,
            };
        },
        { query: 'pagination.options' },
    );
