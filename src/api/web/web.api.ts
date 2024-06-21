import Elysia from 'elysia';

import { UsersController } from './users/users.controller';

export const WebApi = new Elysia({ prefix: '/web' }).use(UsersController);
