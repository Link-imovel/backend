import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { LoginUser } from '../interfaces/user';

export class LoginUserDTO implements LoginUser {
  @ApiProperty({ type: String, required: true, example: 'login@link.com' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ type: String, required: true, example: 'senha!23' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export default LoginUserDTO;
