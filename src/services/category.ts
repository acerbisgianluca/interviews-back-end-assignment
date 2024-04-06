import { db } from '../libs/database.ts';
import { categories } from '../schema/categories.ts';
import { count, eq } from 'drizzle-orm';
import { products } from '../schema/products.ts';
import type { CategoryWithProductStockQuantity } from '../models/category.ts';

export abstract class CategoryService {
    public static getAllCategoriesWithProductStockQuantity(): Promise<
        CategoryWithProductStockQuantity[]
    > {
        return db
            .select({
                id: categories.id,
                name: categories.name,
                numOfProducts: count(products.id),
            })
            .from(categories)
            .leftJoin(products, eq(categories.id, products.categoryId))
            .groupBy(categories.id, categories.name);
    }
}
