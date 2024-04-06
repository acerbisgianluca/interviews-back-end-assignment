import { type Static, t } from 'elysia';

export const cardDetailsSchema = t.Object({
    cardNumber: t.RegExp(/\b\d{16}\b/),
    expiryMonth: t.RegExp(/\b(0[1-9]|1[0-2])\b/),
    expiryYear: t.RegExp(/\b\d{4}\b/),
    cvv: t.RegExp(/\b\d{3}\b/),
});

export type CardDetails = Static<typeof cardDetailsSchema>;
export type ProcessPaymentRequest = {
    amount: number;
    cardDetails: CardDetails;
};
export type ProcessPaymentResponse = {
    transactionId: string;
    status: 'approved' | 'declined' | 'error';
};
export type ProcessPaymentErrorResponse = {
    code: number;
    message: string;
};
