import { Elysia } from 'elysia';
import { setup } from '../setup.ts';
import { orderRequestBody } from '../models/order.ts';
import { OrderService } from '../services/order.ts';

export const orders = new Elysia({
    name: 'Controller.Orders',
    prefix: '/orders',
})
    .use(setup)
    .post(
        '/',
        async ({ body, set, error }) => {
            try {
                const order = await OrderService.createOrder(
                    body.items,
                    body.cardDetails,
                    body.rewardPoints,
                );

                set.status = 201;
                return {
                    result: order,
                };
            } catch (err) {
                console.error(err);

                if (err instanceof Error) {
                    return error(422, {
                        error: err.message,
                    });
                }
            }
        },
        {
            body: orderRequestBody,
        },
    );
