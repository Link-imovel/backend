import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import createUserDto from 'src/dto/user.create.dto';
import updateUserDto from 'src/dto/user.update.dto';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async list(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async create(data: createUserDto): Promise<User> {
    let user = new User();
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    user.password = data.password;
    user.birthday = data.birthday;
    user.createdAt = data.createdAt;
    user.updatedAt = data.updatedAt;
    return await this.usersRepository.save(user);
  }

  async update(data: updateUserDto): Promise<User> {
    let user = await this.usersRepository.findOne(data.id);
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    user.password = data.password;
    user.birthday = data.birthday;
    user.createdAt = data.createdAt;
    user.updatedAt = data.updatedAt;
    return await this.usersRepository.save(user);
  }

  findAll(): string {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
