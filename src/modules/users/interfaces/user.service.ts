import { User } from 'src/entities/user.entity';
import CreateUserDTO from '../dto/create.dto';
import UpdateUserDTO from '../dto/update.dto';
import UpdatePasswordUserDTO from '../dto/updatePassword.dto';

interface IUserService {
  create: (data: CreateUserDTO) => Promise<User>;
  update: (id: string, data: UpdateUserDTO) => Promise<User>;
  setPassword: (id: string, data: UpdatePasswordUserDTO) => Promise<User>;
  find: (id: string) => Promise<User>;
  findByEmail: (email: string) => Promise<User>;
  findAll: () => Promise<User[]>;
  deactivate: (id: string) => unknown;
  activate: (id: string) => Promise<User>;
}

export type { IUserService };
