import {
  char,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { ulid } from 'ulid';

export const user = pgTable(
  'user',
  {
    id: char('id', { length: 26 })
      .primaryKey()
      .$default(() => ulid().toLowerCase()),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
    email: text('email').notNull(),
    password: text('password'),
    name: text('name'),
  },
  (user) => ({
    emailIdx: uniqueIndex().on(user.email),
    nameIdx: index().on(user.name),
    deletedAtIdx: index().on(user.deletedAt),
  }),
);
