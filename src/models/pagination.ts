import { Elysia, type Static, t } from 'elysia';

export const paginationOptions = t.Object({
    offset: t.Optional(
        t.Numeric({ minimum: 0, error: 'Must be a number greater than or equal to 0' }),
    ),
    limit: t.Optional(
        t.Numeric({ minimum: 1, error: 'Must be a number greater than or equal to 1' }),
    ),
});

export type PaginationOptions = Static<typeof paginationOptions>;

export const paginationModels = new Elysia({
    name: 'Model.Pagination',
}).model({
    'pagination.options': paginationOptions,
});
