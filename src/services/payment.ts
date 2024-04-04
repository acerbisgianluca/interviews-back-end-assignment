import type {
    ProcessPaymentRequest,
    ProcessPaymentResponse /*ProcessPaymentErrorResponse*/,
} from '../models/payment.ts';
import { randomUUID } from 'node:crypto';

export abstract class PaymentService {
    /*public static async processPayment(processPaymentRequest: ProcessPaymentRequest): Promise<ProcessPaymentResponse | ProcessPaymentErrorResponse> {
        try {
            const response = await fetch('https://paymentservice.example.com/api/payment', {
                method: 'POST',
                body: JSON.stringify(processPaymentRequest),
                headers: {
                    "Content-Type": "application/json",
                }
            });

            return response.json();
        } catch(err) {
            console.error('Error processing payment', err);

            throw err;
        }
    }*/

    public static async processPayment(
        processPaymentRequest: ProcessPaymentRequest,
    ): Promise<ProcessPaymentResponse> {
        console.info('Processing payment...', processPaymentRequest);

        return {
            transactionId: randomUUID(),
            status: Math.random() > 0.5 ? 'approved' : 'declined',
        };
    }
}
