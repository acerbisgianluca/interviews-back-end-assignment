import { type Static, t, type TSchema } from 'elysia';

export type ResponseData<T> =
    T extends Array<unknown>
        ? {
              result: T;
              size: number;
          }
        : {
              result: T;
          };
export type ErrorResponseData = Static<typeof errorResponseDataSchema>;

export const createResponseArrayDataSchema = <SCHEMA extends TSchema>(resultSchema: SCHEMA) => {
    return t.Object({
        result: t.Array(resultSchema),
        size: t.Number(),
    });
};

export const createResponseDataSchema = <SCHEMA extends TSchema>(resultSchema: SCHEMA) => {
    return t.Object({
        result: resultSchema,
    });
};

export const createResponseData = <T>(data: T): ResponseData<T> => {
    if (Array.isArray(data)) {
        return {
            result: data,
            size: data.length,
        } as ResponseData<T>;
    } else {
        return {
            result: data,
        } as ResponseData<T>;
    }
};

export const errorResponseDataSchema = t.Object({
    error: t.String(),
});

export const createErrorResponseData = (error: Error): ErrorResponseData => {
    return {
        error: error.message,
    };
};
