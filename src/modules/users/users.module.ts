import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permissions.entity';
import { User } from 'src/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Permission]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
