import { User } from 'src/entities/user.entity';
import CreateUserDTO from '../dto/create.dto';
import UpdateUserDTO from '../dto/update.dto';
import UpdatePasswordUserDTO from '../dto/updatePassword.dto';
import ResetPasswordUserDTO from '../dto/resetPassword.dto';

interface IUserService {
  create: (data: CreateUserDTO, reqUser: User) => Promise<void>;
  update: (id: string, data: UpdateUserDTO, reqUser: User) => Promise<User>;
  setPassword: (token: string, data: UpdatePasswordUserDTO) => Promise<User>;
  resetPassword: (data: ResetPasswordUserDTO) => Promise<void>;
  find: (id: string, reqUser: User) => Promise<User>;
  findByEmail: (email: string) => Promise<User>;
  findAll: (reqUser: User) => Promise<User[]>;
  deactivate: (id: string, reqUser: User) => unknown;
  activate: (id: string, reqUser: User) => Promise<User>;
}

export type { IUserService };
