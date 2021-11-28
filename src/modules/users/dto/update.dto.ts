import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UpdateUser } from '../interfaces/user';

export class UpdateUserDTO implements UpdateUser {
  @ApiProperty({ type: String, required: true, example: 'Daniel' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly firstName: string;

  @ApiProperty({ type: String, required: true, example: 'Neneve' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly lastName: string;

  @ApiProperty({ type: String, required: true, example: 'email@email.com' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly email: string;

  @ApiProperty({ type: String, required: true, example: 'password' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly password: string;

  @ApiProperty({ type: String, required: true, example: '+55 (41) 99999-9999' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly phone: string;

  @ApiProperty({ type: String, required: true, example: '+55 (41) 99999-9999' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly mobile: string;

  @ApiProperty({ type: String, required: true, example: '012.123.123-12' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly registry: string;

  @ApiProperty({ type: String, required: true, example: 'PR 213213' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly creci: string;

  @ApiProperty({ type: Date, required: true, example: Date.now() })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly birthday: Date;

  @ApiProperty({ type: Boolean, required: true, example: false })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  readonly isActivate: boolean;
}

export default UpdateUserDTO;
