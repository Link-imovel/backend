import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateUser } from '../interfaces/user';

export class CreateUserDTO implements CreateUser {
  @ApiProperty({ type: String, required: true, example: 'Daniel' })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ type: String, required: true, example: 'Neneve' })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ type: String, required: true, example: 'email@email.com' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ type: String, required: true, example: '+55 (41) 99999-9999' })
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty({ type: String, required: true, example: '+55 (41) 99999-9999' })
  @IsString()
  @IsNotEmpty()
  readonly mobile: string;

  @ApiProperty({ type: String, required: true, example: '012.123.123-12' })
  @IsString()
  @IsNotEmpty()
  readonly registry: string;

  @ApiProperty({ type: String, required: true, example: 'PR 213213' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly creci: string;

  @ApiProperty({ type: Date, required: true, example: Date.now() })
  @IsDate()
  @IsNotEmpty()
  readonly birthday: Date;

  @ApiProperty({ type: String, required: true, example: 'user' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly permissionLevel: string;

  @ApiProperty({ type: Boolean, required: true, example: false })
  @IsBoolean()
  @IsNotEmpty()
  readonly isActivate: boolean;
}

export default CreateUserDTO;
