import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
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
import { AuthGuard } from '@nestjs/passport';
import ResetPasswordUserDTO from './dto/resetPassword.dto';

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

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() data: CreateUserDTO,
    @Request() req: any,
  ): Promise<void> {
    return await this.userService.create(data, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDTO,
    @Request() req: any,
  ): Promise<User> {
    return await this.userService.update(id, data, req.user);
  }

  @Patch('password/:token')
  async updatePassword(
    @Param('token') token: string,
    @Body() data: UpdatePasswordUserDTO,
  ): Promise<User> {
    return await this.userService.setPassword(token, data);
  }

  @Patch('password/reset')
  async resetPassword(@Body() data: ResetPasswordUserDTO): Promise<void> {
    return await this.userService.resetPassword(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string, @Request() req: any): Promise<User> {
    return await this.userService.find(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(@Request() req: any): Promise<User[]> {
    return await this.userService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/deactivate')
  async setInactive(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<void> {
    this.userService.deactivate(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/activate')
  async setActive(@Param('id') id: string, @Request() req: any): Promise<User> {
    return this.userService.activate(id, req.user);
  }
}
