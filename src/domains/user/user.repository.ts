import { and, desc, eq, isNull, lt, sql } from 'drizzle-orm';
import { inject, singleton } from 'tsyringe';

import { DB_TOKEN } from 'src/database';
import type { Database } from 'src/database';

import { user } from './user.schema';

import type { NewUser, User } from './types';
import type { ListParams, ListResponse } from 'src/common/types';

@singleton()
export class UserRepository {
  constructor(@inject(DB_TOKEN) private readonly db: Database) {}

  public async createUser(params: NewUser): Promise<User> {
    const users = await this.db.insert(user).values(params).returning();

    return users[0];
  }

  public async findUsersList(
    pagination: ListParams = {},
  ): Promise<ListResponse<User>> {
    const { cursor, limit = 10 } = pagination;

    const filters = [isNull(user.deletedAt)];

    if (cursor) {
      filters.push(lt(user.id, cursor));
    }

    const users = await this.db
      .select()
      .from(user)
      .where(and(...filters))
      .limit(limit + 1)
      .orderBy(desc(user.id));

    let nextUser: User | null = null;

    if (users.length === limit + 1) {
      nextUser = users.pop() || null;
    }

    const nextCursor = nextUser ? nextUser.id : null;

    return { items: users, nextCursor };
  }

  public async findUserById(id: User['id']): Promise<User | null> {
    const users = await this.db
      .select()
      .from(user)
      .where(eq(user.id, id))
      .limit(1);

    return users[0] || null;
  }

  public async checkExistsEmail(email: User['email']): Promise<boolean> {
    const result = await this.db.execute<{ exists: boolean }>(
      sql`select exists (select 1 from ${user} where lower(email) = ${email.toLowerCase()})`,
    );

    return result[0].exists;
  }

  public async updateUser(id: User['id'], params: User): Promise<User> {
    const users = await this.db
      .update(user)
      .set(params)
      .where(eq(user.id, id))
      .returning();

    return users[0];
  }

  public async deleteUser(id: User['id']): Promise<void> {
    await this.db.delete(user).where(eq(user.id, id));
  }
}
