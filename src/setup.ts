import { Elysia } from 'elysia';
import { paginationModels } from './models/pagination.ts';

export const setup = new Elysia({ name: 'setup' }).use(paginationModels);
