import { singleton } from 'tsyringe';

import { UserRepository } from './user.repository';

import { NewUser, User } from './types';
import { ListParams, ListResponse } from 'src/common/types';

import { NotFoundException, ValidationException } from 'src/common/exceptions';

@singleton()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  public async getUsersList(params?: ListParams): Promise<ListResponse<User>> {
    return this.userRepo.findUsersList(params);
  }

  public async getUserById(id: User['id']): Promise<User> {
    const user = await this.userRepo.findUserById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return user;
  }

  public async createUser(params: NewUser): Promise<User> {
    const exists = await this.userRepo.checkExistsEmail(params.email);

    if (exists) {
      throw new ValidationException({
        email: ['A user with this email address already exists'],
      });
    }

    return this.userRepo.createUser(params);
  }

  public async updateUser(id: User['id'], params: User): Promise<User> {
    return this.userRepo.updateUser(id, params);
  }

  public async deleteUser(id: User['id']): Promise<void> {
    await this.userRepo.deleteUser(id);
  }
}
