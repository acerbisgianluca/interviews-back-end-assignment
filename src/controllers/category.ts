import { Elysia } from 'elysia';
import { CategoryService } from '../services/category.ts';
import { createResponseArrayDataSchema, createResponseData } from '../models/response.ts';
import { categoryWithProductStockQuantitySchema } from '../models/category.ts';

export const categoryController = new Elysia({
    name: 'Controller.Category',
    prefix: '/categories',
}).get(
    '/',
    async () => {
        const categories = await CategoryService.getAllCategoriesWithProductStockQuantity();

        return createResponseData(categories);
    },
    {
        response: createResponseArrayDataSchema(categoryWithProductStockQuantitySchema),
    },
);
