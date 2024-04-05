import { beforeAll, afterAll } from 'bun:test';
import { db } from '../src/libs/database.ts';
import { categories } from '../src/schema/categories.ts';
import { products } from '../src/schema/products.ts';
import { discounts } from '../src/schema/discounts.ts';
import { sql } from 'drizzle-orm';
import { ordersToProducts } from '../src/schema/ordersToProducts.ts';
import { rewards } from '../src/schema/rewards.ts';
import { orders } from '../src/schema/orders.ts';

beforeAll(async () => {
    const createdCategories = await db
        .insert(categories)
        .values([
            {
                name: 'Fruits',
            },
            {
                name: 'Books',
            },
            {
                name: 'Electronics',
            },
        ])
        .returning();

    const createdProducts = await db
        .insert(products)
        .values([
            {
                name: 'Apple',
                price: 1.5,
                stockQuantity: 100,
                category: createdCategories[0].id,
                extraRewardPoints: 0,
            },
            {
                name: 'Harry Potter',
                price: 25,
                stockQuantity: 50,
                category: createdCategories[1].id,
                extraRewardPoints: 10,
            },
        ])
        .returning();

    await db.insert(discounts).values([
        {
            productId: createdProducts[1].id,
            amount: 10,
            startDate: sql`datetime('2024-01-01')`,
            endDate: sql`datetime('2024-12-31')`,
        },
    ]);
});

afterAll(async () => {
    await db.delete(ordersToProducts);
    await db.delete(rewards);
    await db.delete(orders);
    await db.delete(discounts);
    await db.delete(products);
    await db.delete(categories);
});
