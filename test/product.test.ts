import { describe, expect, it } from 'bun:test';
import { treaty } from '@elysiajs/eden';
import { app } from '../src';

const client = treaty(app);

describe('product', () => {
    it('get product list', async () => {
        const { data } = await client.api.products.index.get({ query: {} });

        expect(data?.result).toBeArrayOfSize(2);
    });

    it('get fruits', async () => {
        const { data } = await client.api.products.index.get({ query: { cid: 1 } });
        expect(data?.result[0]?.name).toBe('Apple');
    });

    it('get product by name', async () => {
        const { data } = await client.api.products.index.get({ query: { q: 'harry' } });

        expect(data?.result).toBeArrayOfSize(1);
        expect(data?.result[0].name).toBe('Harry Potter');
    });
});
