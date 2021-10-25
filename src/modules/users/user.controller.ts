import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Inject,
} from '@nestjs/common';
import { USER_SERVICE } from 'src/config/module.constants';
import { User } from 'src/entities/user.entity';
import UserDTO from './dto/user.dto';
import { UserServiceInterface } from './interfaces/service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private userService: UserServiceInterface,
  ) {}

  @Get(':id')
  async show(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Get()
  async index(): Promise<User[]> {
    return await this.userService.list();
  }

  @Post()
  async store(@Body() data: UserDTO): Promise<User> {
    return await this.userService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<UserDTO>,
  ): Promise<any> {
    return await this.userService.update({ id, ...data });
  }

  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<void> {
    this.userService.remove(id);
  }
}
