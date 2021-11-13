import CreateUserDTO from '../dto/create.dto';
import LoginUserDTO from '../dto/login.dto';
import UpdateUserDTO from '../dto/update.dto';
import UpdatePasswordUserDTO from '../dto/updatePassword.dto';
import { LoginResponse } from 'src/modules/auth/interfaces/auth';
import { User } from 'src/entities/user.entity';

interface IUserController {
  login: (data: LoginUserDTO) => Promise<LoginResponse>;
  create: (data: CreateUserDTO) => Promise<User>;
  update: (id: string, data: UpdateUserDTO) => Promise<User>;
  updatePassword: (id: string, data: UpdatePasswordUserDTO) => unknown;
  getUser: (id: string) => Promise<User>;
  getUsers: () => Promise<User[]>;
  setInactive: (id: string) => unknown;
  setActive: (id: string) => unknown;
}

export type { IUserController };
