import { describe, expect, it } from 'bun:test';
import { treaty } from '@elysiajs/eden';
import { app } from '../src';

const client = treaty(app);

describe('order', () => {
    it('should create a simple order', async () => {
        const { data } = await client.api.orders.index.post({
            items: [
                {
                    productId: 1,
                    quantity: 1,
                },
            ],
            rewardPoints: 0,
            cardDetails: {
                cardNumber: '1111111111111111',
                expiryMonth: '12',
                expiryYear: '2024',
                cvv: '123',
            },
        });

        expect(data?.result.amount).toBe(1.5);

        const { data: rewardData } = await client.api.rewards.index.get();
        expect(rewardData?.result).toBe(1);
    });

    it('should create a simple order with discount', async () => {
        const { data } = await client.api.orders.index.post({
            items: [
                {
                    productId: 2,
                    quantity: 1,
                },
            ],
            rewardPoints: 0,
            cardDetails: {
                cardNumber: '1111111111111111',
                expiryMonth: '12',
                expiryYear: '2024',
                cvv: '123',
            },
        });

        expect(data?.result.amount).toBe(90);
    });
});
