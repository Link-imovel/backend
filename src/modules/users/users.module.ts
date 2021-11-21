import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordTokens } from 'src/entities/password_tokens.entity';
import { Permission } from 'src/entities/permissions.entity';
import { User } from 'src/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { UsersService } from './users.service';
import { EmailsModule } from '../email/emails.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Permission, PasswordTokens]),
    forwardRef(() => AuthModule),
    EmailsModule,
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
