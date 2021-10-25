import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permissions.entity';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import UserDTO from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async list(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async create(data: Required<UserDTO>): Promise<User> {
    let user = new User();

    if (data.permissionLevel) user = { ...data };

    if (!data.permissionLevel) {
      const { id: permissionLevel } = await this.permissionRepository.findOne({
        name: 'user',
      });
      user = { ...data, permissionLevel };
    }

    return await this.usersRepository.save(user);
  }

  async update(data: Partial<UserDTO>): Promise<User> {
    const { id } = await this.usersRepository.findOne(data.id);
    await this.usersRepository.update({ id }, { ...data });
    return this.usersRepository.findOne(data.id);
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  remove(id: string): void {
    this.usersRepository.delete(id);
  }
}
