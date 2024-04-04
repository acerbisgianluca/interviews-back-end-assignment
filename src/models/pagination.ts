import { type Static, t } from 'elysia';

export const paginationOptions = t.Partial(
    t.Object({
        offset: t.Numeric({ minimum: 0, error: 'Must be a number greater than or equal to 0' }),
        limit: t.Numeric({ minimum: 1, error: 'Must be a number greater than or equal to 1' }),
    }),
);

export type PaginationOptions = Static<typeof paginationOptions>;
