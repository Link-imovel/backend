import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from 'src/entities/token.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private TokenRepository: Repository<Token>,
    private userService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async saveToken(hash: string, username: string) {
    const objToken = await this.TokenRepository.findOne({ username: username });
    if (objToken) {
      this.TokenRepository.update(objToken.id, { hash: hash });
    } else {
      this.TokenRepository.insert({
        hash: hash,
        username: username,
      });
    }
  }

  async refreshToken(oldToken: string) {
    const objToken = await this.TokenRepository.findOne({ hash: oldToken });
    if (objToken) {
      const user = await this.userService.findUser(objToken.username);
      return this.authService.login(user);
    } else {
      return new HttpException(
        {
          errorMessage: 'Invalid Token',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
