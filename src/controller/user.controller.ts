import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata';
import createUserDto from 'src/dto/user.create.dto';
import updateUserDto from 'src/dto/user.update.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  @Get(':id')
  async show(@Param('id') id: string): Promise<User> {
    return await this.userRepo.findOne(id);
  }

  @Get()
  async index(): Promise<User[]> {
    return await this.userRepo.find();
  }

  @Post()
  async store(@Body() data: createUserDto): Promise<User> {
    return this.userRepo.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: updateUserDto,
  ): Promise<any> {
    return this.userRepo.update({ id }, data);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<void> {
    await this.userRepo.findOne(id);
    await this.userRepo.delete(id);
  }
}
