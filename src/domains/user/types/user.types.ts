import { user } from '../user.schema';

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
