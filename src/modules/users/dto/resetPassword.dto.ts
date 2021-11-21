import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ResetPasswordUser } from '../interfaces/user';

export class ResetPasswordUserDTO implements ResetPasswordUser {
  @ApiProperty({ type: String, required: true, example: 'login@link.com' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;
}

export default ResetPasswordUserDTO;
