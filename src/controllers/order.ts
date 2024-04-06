import { Elysia } from 'elysia';
import { createOrderRequestData, orderSchema } from '../models/order.ts';
import { OrderService } from '../services/order.ts';
import {
    createResponseData,
    createResponseDataSchema,
    errorResponseDataSchema,
} from '../models/response.ts';

export const orderController = new Elysia({
    name: 'Controller.Order',
    prefix: '/orders',
}).post(
    '/',
    async ({ body, set, error }) => {
        try {
            const order = await OrderService.createOrder(
                body.items,
                body.cardDetails,
                body.rewardPoints,
            );

            set.status = 201;
            return createResponseData(order);
        } catch (err) {
            console.error('Create order error:', err);

            if (err instanceof Error) {
                return error(422, {
                    error: err.message,
                });
            }

            throw err;
        }
    },
    {
        body: createOrderRequestData,
        response: {
            200: createResponseDataSchema(orderSchema),
            422: errorResponseDataSchema,
        },
    },
);
