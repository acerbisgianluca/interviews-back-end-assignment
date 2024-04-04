import { Elysia } from 'elysia';
import { setup } from '../setup.ts';
import { CategoryService } from '../services/category.ts';

export const categories = new Elysia({
    name: 'Controller.Categories',
    prefix: '/categories',
})
    .use(setup)
    .get('/', async () => {
        const categories = await CategoryService.getAllCategoriesWithProductStockQuantity();

        return {
            result: categories,
            size: categories.length,
        };
    });
