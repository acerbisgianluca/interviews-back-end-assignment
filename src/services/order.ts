import { db } from '../libs/database.ts';
import type { CartItem, Order } from '../models/order.ts';
import { orders } from '../schema/orders.ts';
import { ordersToProducts } from '../schema/ordersToProducts.ts';
import { products } from '../schema/products.ts';
import { and, eq, gte, sql } from 'drizzle-orm';
import type { CardDetails } from '../models/payment.ts';
import { PaymentService } from './payment.ts';

export abstract class OrderService {
    public static async createOrder(items: CartItem[], cardDetails: CardDetails): Promise<Order> {
        return db.transaction(async (tx) => {
            let amount = 0;
            for (const item of items) {
                const [product] = await tx
                    .update(products)
                    .set({ stockQuantity: sql`stock_quantity - ${item.quantity}` })
                    .where(
                        and(
                            eq(products.id, item.productId),
                            gte(products.stockQuantity, item.quantity),
                        ),
                    )
                    .returning({ id: products.id, price: products.price });
                if (!product) {
                    throw new Error(
                        `Product with ID ${item.productId} is not available in the required quantity`,
                    );
                }

                amount += product.price * item.quantity;
            }

            const paymentResponse = await PaymentService.processPayment({
                amount,
                cardDetails,
            });

            const [order] = await tx
                .insert(orders)
                .values([
                    {
                        amount,
                        transactionId: paymentResponse.transactionId,
                    },
                ])
                .returning();

            if (paymentResponse.status === 'declined') {
                throw new Error('Payment declined');
            } else if (paymentResponse.status === 'error') {
                throw new Error('Payment error');
            }

            for (const item of items) {
                await tx
                    .insert(ordersToProducts)
                    .values([
                        { orderId: order.id, productId: item.productId, quantity: item.quantity },
                    ]);
            }

            return order;
        });
    }
}
