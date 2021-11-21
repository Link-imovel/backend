import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permissions.entity';
import { Repository } from 'typeorm';
import { IUserService } from './interfaces/user.service';
import { User } from '../../entities/user.entity';
import CreateUserDTO from './dto/create.dto';
import UpdateUserDTO from './dto/update.dto';
import UpdatePasswordUserDTO from './dto/updatePassword.dto';
import ResetPasswordUserDTO from './dto/resetPassword.dto';
import { PasswordTokens } from 'src/entities/password_tokens.entity';
import { EmailsService } from 'src/modules/email/emails.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(PasswordTokens)
    private tokensRepository: Repository<PasswordTokens>,
    private emailService: EmailsService,
  ) {}

  async create(data: CreateUserDTO, reqUser: User): Promise<void> {
    let user = await this.usersRepository.findOne({
      where: [
        {
          email: data.email,
        },
        {
          registry: data.registry,
        },
      ],
    });

    const permission = await this.permissionRepository.findOne({
      name: 'admin',
    });

    if (reqUser.permissionLevel !== permission.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }

    if (user) {
      throw new HttpException(
        'User already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    user = new User();
    const { id: permissionLevel } = await this.permissionRepository.findOne({
      name: data.permissionLevel,
    });

    Object.keys(data).map((val) => {
      user[val] = data[val];
    });

    user.isActive = false;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    user.permissionLevel = permissionLevel;

    user.password = bcrypt.hashSync(data.password, 8);
    user = await this.usersRepository.save(user);

    const tokens = new PasswordTokens();
    tokens.userId = user.id;
    tokens.expiredAt = new Date(Date.now() + 3 * 3600 * 1000);

    const { id: tokenId } = await this.tokensRepository.save(tokens);
    this.emailService.sendEmail(
      user.email,
      `${user.firstName}, Bem-vindo a link_`,
      'createAccount',
      {
        firstName: user.firstName,
        passwordLink: process.env.HOST_URL + 'set-password?token=' + tokenId,
      },
    );
  }

  async update(id: string, data: UpdateUserDTO, reqUser: User): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    const permission = await this.permissionRepository.findOne({
      name: 'admin',
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.id !== reqUser.id && reqUser.permissionLevel !== permission.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }

    await this.usersRepository.update({ id }, { ...data });
    return this.usersRepository.findOne(id);
  }

  async setPassword(token: string, data: UpdatePasswordUserDTO): Promise<User> {
    const { userId, expiredAt } = await this.tokensRepository.findOne({
      id: token,
    });

    if (data.confirmPassword !== data.password) {
      throw new HttpException(
        'Passwords does not match.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (new Date() > new Date(expiredAt)) {
      throw new HttpException(
        'Invalid token provided.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = await this.usersRepository.findOne({ id: userId });
    if (!user) {
      throw new HttpException('User could not be found', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.update(
      { id: userId },
      { ...user, password: bcrypt.hashSync(data.password, 8) },
    );

    return user;
  }

  async resetPassword(data: ResetPasswordUserDTO): Promise<void> {
    const user = await this.findByEmail(data.email);
    const tokens = new PasswordTokens();
    tokens.userId = user.id;
    tokens.expiredAt = new Date(Date.now() + 3 * 3600 * 1000);
    const { id: tokenId } = await this.tokensRepository.save(tokens);
    this.emailService.sendEmail(
      data.email,
      'Resetar a senha - LINK_',
      'resetPwd',
      {
        firstName: user.firstName,
        passwordLink: process.env.HOST_URL + 'set-password?token=' + tokenId,
      },
    );
  }

  async find(id: string, reqUser?: User): Promise<User> {
    const user = await this.usersRepository.findOne(id, {
      where: {
        isActive: true,
      },
    });
    const permission = await this.permissionRepository.findOne({
      name: 'admin',
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.id !== reqUser.id && reqUser.permissionLevel !== permission.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }
    return this.usersRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne(
      { email },
      {
        where: {
          isActive: true,
        },
      },
    );
  }

  async findAll(reqUser: User): Promise<User[]> {
    const permission = await this.permissionRepository.findOne({
      name: 'admin',
    });

    if (reqUser.permissionLevel !== permission.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }
    return await this.usersRepository.find();
  }

  async deactivate(id: string, reqUser: User): Promise<unknown> {
    const user = await this.usersRepository.findOne(id);
    const permission = await this.permissionRepository.findOne({
      name: 'admin',
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (reqUser.permissionLevel !== permission.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }

    await this.usersRepository.update(id, { isActive: false });
    return this.usersRepository.findOne(id);
  }

  async activate(id: string, reqUser: User): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    const permission = await this.permissionRepository.findOne({
      name: 'admin',
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (reqUser.permissionLevel !== permission.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }

    await this.usersRepository.update(id, { isActive: true });
    return this.usersRepository.findOne(id);
  }
}
