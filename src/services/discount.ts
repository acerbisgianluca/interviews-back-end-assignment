import type { Discount } from '../models/discount.ts';
import { db } from '../libs/database.ts';
import { sql } from 'drizzle-orm';

export abstract class DiscountService {
    public static async getActiveDiscountByProductId(
        productId: number,
    ): Promise<Discount | undefined> {
        return db.query.discounts.findFirst({
            where: (discounts, { and, eq, between }) =>
                and(
                    eq(discounts.productId, productId),
                    between(sql`unixepoch()`, discounts.startDate, discounts.endDate),
                ),
        });
    }
}
