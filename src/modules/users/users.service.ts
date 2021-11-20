import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permissions.entity';
import { Repository } from 'typeorm';
import { IUserService } from './interfaces/user.service';
import { User } from '../../entities/user.entity';
import CreateUserDTO from './dto/create.dto';
import UpdateUserDTO from './dto/update.dto';
import UpdatePasswordUserDTO from './dto/updatePassword.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(data: CreateUserDTO, userId: any): Promise<User> {
    let user = await this.usersRepository.findOne({
      where: [
        {
          email: data.email,
        },
        {
          registry: data.registry,
        },
      ],
    });

    const permission = await this.permissionRepository.findOne({
      name: 'admin',
    });

    if (userId.permissionLevel !== permission.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }

    if (user) {
      throw new HttpException(
        'User already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    user = new User();
    const { id: permissionLevel } = await this.permissionRepository.findOne({
      name: data.permissionLevel,
    });

    Object.keys(data).map((val) => {
      user[val] = data[val];
    });

    user.createdAt = new Date();
    user.updatedAt = new Date();

    user.permissionLevel = permissionLevel;

    user.password = bcrypt.hashSync(data.password, 8);
    user = await this.usersRepository.save(user);
    return await this.usersRepository.findOne({ id: user.id });
  }

  async update(id: string, data: UpdateUserDTO, userId: any): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    const permission = await this.permissionRepository.findOne({
      name: 'admin',
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.id !== userId.id && userId.permissionLevel !== permission.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }

    await this.usersRepository.update({ id }, { ...data });
    return this.usersRepository.findOne(id);
  }

  setPassword: (id: string, data: UpdatePasswordUserDTO) => Promise<User>;

  async find(id: string, userId?: any): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    const permission = await this.permissionRepository.findOne({
      name: 'admin',
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.id !== userId.id && userId.permissionLevel !== permission.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }
    return this.usersRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async findAll(userId?: any): Promise<User[]> {
    const permission = await this.permissionRepository.findOne({
      name: 'admin',
    });

    if (userId.permissionLevel !== permission.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }
    return await this.usersRepository.find();
  }

  async deactivate(id: string, userId: any): Promise<unknown> {
    // @TODO: Deactivate method
    const user = await this.usersRepository.findOne(id);
    const permission = await this.permissionRepository.findOne({
      name: 'admin',
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (userId.permissionLevel !== permission.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }

    // await this.usersRepository.update(id, { status: 'ACTIVATE' });
    return this.usersRepository.findOne(id);
  }

  async activate(id: string, userId: any): Promise<User> {
    // @TODO: Activate method
    const user = await this.usersRepository.findOne(id);
    const permission = await this.permissionRepository.findOne({
      name: 'admin',
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (userId.permissionLevel !== permission.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }
    // await this.usersRepository.update(id, { status: 'DEACTIVATE' });
    return this.usersRepository.findOne(id);
  }
}
