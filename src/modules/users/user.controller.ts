import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import UserDTO from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get(':id')
  async show(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
