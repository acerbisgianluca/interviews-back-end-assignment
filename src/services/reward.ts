import { db } from '../libs/database.ts';
import { sum } from 'drizzle-orm';
import { rewards } from '../schema/rewards.ts';

export abstract class RewardService {
    public static async getRewardsBalance(): Promise<number> {
        const [result] = await db
            .select({ balance: sum(rewards.amount).mapWith(rewards.amount) })
            .from(rewards);

        return result.balance ?? 0;
    }
}
