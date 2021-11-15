import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PublicationModule } from '../publications/publications.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    UsersModule,
    TokenModule,
    PublicationModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
