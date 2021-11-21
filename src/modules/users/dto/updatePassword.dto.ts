import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UpdatePasswordUser } from '../interfaces/user';

export class UpdatePasswordUserDTO implements UpdatePasswordUser {
  @ApiProperty({ type: String, required: true, example: 'senha123' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ type: String, required: true, example: 'senha!23' })
  @IsString()
  @IsNotEmpty()
  readonly confirmPassword: string;
}

export default UpdatePasswordUserDTO;
