import { Elysia } from 'elysia';
import { ProductService } from '../services/product.ts';
import {
    getAllProductsQuerySchema,
    getProductByIdParamSchema,
    productSchema,
} from '../models/product.ts';
import {
    createResponseArrayDataSchema,
    createResponseData,
    createResponseDataSchema,
    errorResponseDataSchema,
} from '../models/response.ts';

export const productController = new Elysia({
    name: 'Controller.Product',
    prefix: '/products',
})
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

            return createResponseData(availableProducts);
        },
        {
            query: getAllProductsQuerySchema,
            response: createResponseArrayDataSchema(productSchema),
        },
    )
    .get(
        '/:productId',
        async ({ params: { productId }, error }) => {
            const product = await ProductService.getProductById(productId);

            if (product === undefined) {
                return error(404, { error: 'Product not found' });
            }

            return createResponseData(product);
        },
        {
            params: getProductByIdParamSchema,
            response: {
                200: createResponseDataSchema(productSchema),
                404: errorResponseDataSchema,
            },
        },
    );
