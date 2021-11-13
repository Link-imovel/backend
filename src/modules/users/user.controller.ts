import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import CreateUserDTO from './dto/create.dto';
import LoginUserDTO from './dto/login.dto';
import UpdateUserDTO from './dto/update.dto';
import { IUserController } from './interfaces/user.controller';
import { LoginResponse } from '../auth/interfaces/auth';
import UpdatePasswordUserDTO from './dto/updatePassword.dto';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UserController implements IUserController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() data: LoginUserDTO): Promise<LoginResponse> {
    return this.authService.login(data);
  }

  @Post()
  async create(@Body() data: CreateUserDTO): Promise<User> {
    return await this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDTO,
  ): Promise<User> {
    return await this.userService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() data: UpdatePasswordUserDTO,
  ): Promise<User> {
    return await this.userService.setPassword(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.userService.find(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async setInactive(@Param('id') id: string): Promise<void> {
    this.userService.deactivate(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('activate')
  async setActive(@Param('id') id: string): Promise<void> {
    this.userService.activate(id);
  }
}
