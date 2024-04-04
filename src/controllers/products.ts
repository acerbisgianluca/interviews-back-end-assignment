import { Elysia, t } from 'elysia';
import { setup } from '../setup.ts';
import { ProductService } from '../services/product.ts';
import { paginationOptions } from '../models/pagination.ts';
import { productFilterOptions } from '../models/product.ts';

export const products = new Elysia({
    name: 'Controller.Products',
    prefix: '/products',
})
    .use(setup)
    .get(
        '/',
        async ({ query: { offset, limit, cid, q } }) => {
            const availableProducts = await ProductService.getAllAvailableProducts(
                { cid, q },
                {
                    offset,
                    limit,
                },
            );

            return {
                result: availableProducts,
                size: availableProducts.length,
            };
        },
        {
            query: t.Composite([paginationOptions, productFilterOptions]),
        },
    )
    .get(
        '/:productId',
        async ({ params: { productId }, error }) => {
            const product = await ProductService.getProductById(productId);

            if (product === undefined) {
                return error(404, { error: 'Product not found' });
            }

            return {
                result: product,
            };
        },
        {
            params: t.Object({
                productId: t.Numeric(),
            }),
        },
    );
