import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import UserDTO from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get(':id')
  async show(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Get()
  async index(): Promise<User[]> {
    return await this.userService.list();
  }

  @Post()
  async store(@Body() data: Required<UserDTO>): Promise<User> {
    return await this.userService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<UserDTO>,
  ): Promise<User> {
    return await this.userService.update({ id, ...data });
  }

  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<void> {
    this.userService.remove(id);
  }
}
