import type { discounts } from '../schema/discounts.ts';

export type Discount = typeof discounts.$inferSelect;
