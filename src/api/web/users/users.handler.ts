import { singleton } from 'tsyringe';

import { UserService } from 'src/domains/user/user.service';

@singleton()
export class UsersHandler {
  constructor(private readonly userService: UserService) {}

  public async createUser(params: any): Promise<void> {
    return await this.userService.createUser(params);
  }

  public async getUsersList() {
    return this.userService.getUsersList();
  }

  public async getUser(id: string) {
    return this.userService.getUserById(id);
  }

  public async updateUser(id: string, params: any) {
    return this.userService.updateUser(id, params);
  }

  public async deleteUser(id: string) {
    return this.userService.deleteUser(id);
  }
}
