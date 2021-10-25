import { Provider } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';
import { USER_SERVICE } from 'src/config/module.constants';

export const UserProviders: Provider[] = [
  {
    provide: USER_SERVICE,
    useFactory: (usersRepository: Repository<User>) =>
      new UsersService(usersRepository),
    inject: [],
  },
];
