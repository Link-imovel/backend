import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUser(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const userData = await this.usersService.findUser(user.email);
    if (userData.id) {
      const payload = { username: user.email, sub: user.id };
      const token = this.jwtService.sign(payload);
      this.tokenService.saveToken(token, userData.id);
      return {
        access_token: token,
      };
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
