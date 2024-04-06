import { db } from '../libs/database.ts';
import type { CartItem, Order } from '../models/order.ts';
import { orders } from '../schema/orders.ts';
import { ordersToProducts } from '../schema/ordersToProducts.ts';
import { products } from '../schema/products.ts';
import { and, eq, gte, sql } from 'drizzle-orm';
import type { CardDetails } from '../models/payment.ts';
import { PaymentService } from './payment.ts';
import { RewardService } from './reward.ts';
import { rewards } from '../schema/rewards.ts';
import { DiscountService } from './discount.ts';

export abstract class OrderService {
    public static async createOrder(
        items: CartItem[],
        cardDetails: CardDetails,
        rewardPoints: number = 0,
    ): Promise<Order> {
        return db.transaction(async (tx) => {
            let amount = 0,
                extraRewardPoints = 0;
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
                    .returning({
                        id: products.id,
                        price: products.price,
                        extraRewardPoints: products.extraRewardPoints,
                    });

                if (!product) {
                    throw new Error(
                        `Product with ID ${item.productId} is not available in the required quantity`,
                    );
                }

                const discount = await DiscountService.getActiveDiscountByProductId(product.id);
                amount +=
                    (discount ? (product.price - (product.price * discount.amount / 100)) : product.price) *
                    item.quantity;
                extraRewardPoints += product.extraRewardPoints * item.quantity;
            }

            let usedRewardPoints = 0;
            if (rewardPoints >= 25) {
                const availableRewardPoints = await RewardService.getRewardsBalance();
                if (rewardPoints > availableRewardPoints) {
                    throw new Error('Insufficient reward points');
                }

                const rewardPointsToEuro = Math.floor(rewardPoints / 25);
                usedRewardPoints = Math.min(amount, rewardPointsToEuro) * 25;
                amount = Math.max(0, amount - rewardPointsToEuro);
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

            if (usedRewardPoints > 0) {
                await tx.insert(rewards).values([{ amount: -usedRewardPoints, orderId: order.id }]);
            }
            await tx
                .insert(rewards)
                .values([{ amount: Math.floor(amount + extraRewardPoints), orderId: order.id }]);

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
