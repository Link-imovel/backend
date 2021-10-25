import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../interfaces/user';

export class UserDTO implements User {
  @ApiProperty({
    type: String,
    required: true,
    example: '1234567-example-12345-12345',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly id: string;

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

  @ApiProperty({ type: Date, required: true, example: Date.now() })
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  readonly birthday: Date;

  @ApiProperty({ type: Date, required: true, example: Date.now() })
  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  @ApiProperty({ type: Date, required: true, example: Date.now() })
  @IsDate()
  @IsOptional()
  readonly updatedAt: Date;

  @ApiProperty({
    type: String,
    required: true,
    example: '1234567-example-12345-12345',
  })
  @IsString()
  @IsOptional()
  readonly permissionLevel: string;
}

export default UserDTO;
