import type { Product } from '../models/product.ts';
import { db } from '../libs/database.ts';
import type { PaginationOptions } from '../models/pagination.ts';

export abstract class ProductService {
    public static getAllAvailableProducts(
        paginationOptions: PaginationOptions,
    ): Promise<Product[]> {
        const limit = paginationOptions.limit ?? 25;
        const offset = paginationOptions.offset ?? 0;

        return db.query.products.findMany({
            where: (products, { gt }) => gt(products.quantity, 0),
            limit,
            offset,
        });
    }
}
