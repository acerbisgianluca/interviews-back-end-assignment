import { Elysia } from 'elysia';
import { setup } from '../setup.ts';
import { RewardService } from '../services/reward.ts';

export const rewards = new Elysia({
    name: 'Controller.Rewards',
    prefix: '/rewards',
})
    .use(setup)
    .get('/', async () => {
        const balance = await RewardService.getRewardsBalance();

        return {
            result: balance,
        };
    });
