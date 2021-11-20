import CreateUserDTO from '../dto/create.dto';
import LoginUserDTO from '../dto/login.dto';
import UpdateUserDTO from '../dto/update.dto';
import UpdatePasswordUserDTO from '../dto/updatePassword.dto';
import { LoginResponse } from 'src/modules/auth/interfaces/auth';
import { User } from 'src/entities/user.entity';

interface IUserController {
  login: (data: LoginUserDTO) => Promise<LoginResponse>;
  create: (data: CreateUserDTO, req: any) => Promise<User>;
  update: (id: string, data: UpdateUserDTO, req: any) => Promise<User>;
  updatePassword: (id: string, data: UpdatePasswordUserDTO) => unknown;
  getUser: (id: string, req: any) => Promise<User>;
  getUsers: (req: any) => Promise<User[]>;
  setInactive: (id: string, req: any) => unknown;
  setActive: (id: string, req: any) => unknown;
}

export type { IUserController };
