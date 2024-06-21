import Elysia from 'elysia';
import { container } from 'tsyringe';

import { CreateUserDto } from './dto';
import { UsersHandler } from './users.handler';

export const UsersController = new Elysia({
  prefix: '/users',
  tags: ['Users'],
})
  .decorate({
    usersService: container.resolve(UsersHandler),
  })
  .post(
    '',
    async ({ usersService, body }) => {
      return usersService.createUser(body);
    },
    { body: CreateUserDto },
  )
  .get('', async ({ usersService }) => {
    return usersService.getUsersList();
  })
  .get('/:id', async ({ usersService, params: { id } }) => {
    return usersService.getUser(id);
  })
  .patch('/:id', async ({ usersService, params: { id }, body }) => {
    return usersService.updateUser(id, body);
  })
  .delete('/:id', async ({ usersService, params: { id } }) => {
    return usersService.deleteUser(id);
  });
