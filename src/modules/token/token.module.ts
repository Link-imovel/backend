import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/entities/token.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { tokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    forwardRef(() => AuthModule),
    UsersModule,
  ],
  controllers: [tokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
