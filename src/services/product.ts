import type { Product, ProductFilterOptions } from '../models/product.ts';
import { db } from '../libs/database.ts';
import type { PaginationOptions } from '../models/pagination.ts';
import { sql } from 'drizzle-orm';

export abstract class ProductService {
    public static getAllAvailableProducts(
        filterOptions: ProductFilterOptions,
        paginationOptions: PaginationOptions,
    ): Promise<Product[]> {
        const limit = paginationOptions.limit ?? 25;
        const offset = paginationOptions.offset ?? 0;

        return db.query.products.findMany({
            where: (products, { gt, eq, like, and }) => {
                const conditions = [gt(products.stockQuantity, 0)];

                if (filterOptions.cid !== undefined) {
                    conditions.push(eq(products.categoryId, filterOptions.cid));
                }

                if (filterOptions.q !== undefined && filterOptions.q.length > 0) {
                    conditions.push(like(products.name, `%${filterOptions.q}%`));
                }

                return and(...conditions);
            },
            with: {
                discounts: {
                    where: (discounts, { between }) =>
                        between(sql`unixepoch()`, discounts.startDate, discounts.endDate),
                },
            },
            limit,
            offset,
        });
    }

    public static getProductById(id: number): Promise<Product | undefined> {
        return db.query.products.findFirst({
            where: (products, { eq }) => eq(products.id, id),
            with: {
                discounts: {
                    where: (discounts, { between }) =>
                        between(sql`unixepoch()`, discounts.startDate, discounts.endDate),
                },
            },
        });
    }
}
