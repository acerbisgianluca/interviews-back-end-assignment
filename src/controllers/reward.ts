import { Elysia } from 'elysia';
import { RewardService } from '../services/reward.ts';
import { createResponseData, createResponseDataSchema } from '../models/response.ts';
import { rewardBalanceSchema } from '../models/reward.ts';

export const rewardController = new Elysia({
    name: 'Controller.Reward',
    prefix: '/rewards',
}).get(
    '/',
    async () => {
        const balance = await RewardService.getRewardsBalance();

        return createResponseData(balance);
    },
    {
        response: createResponseDataSchema(rewardBalanceSchema),
    },
);
