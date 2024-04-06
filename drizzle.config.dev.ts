import type { Config } from "drizzle-kit";
import productionConfig from './drizzle.config.ts';

export default {
    ...productionConfig,
    dbCredentials: {
        url: 'data/test.db',
    }
} satisfies Config;
