import { db } from '../libs/database.ts';
import { categories } from '../schema/categories.ts';
import { count, eq } from 'drizzle-orm';
import { products } from '../schema/products.ts';

export abstract class CategoryService {
    public static getAllCategoriesWithProductQuantity() {
        return db
            .select({
                id: categories.id,
                name: categories.name,
                numOfProducts: count(products.id),
            })
            .from(categories)
            .leftJoin(products, eq(categories.id, products.category))
            .groupBy(categories.id, categories.name);
    }
}
