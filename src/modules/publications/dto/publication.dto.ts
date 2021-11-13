import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Publication } from '../interfaces/publication';

export class PublicationDTO implements Publication {
  @ApiProperty({
    type: String,
    required: true,
    example: '1234567-example-12345-12345',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly id: string;

  @ApiProperty({ type: Boolean, required: true })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  readonly reserved: boolean;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly views: number;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly virtualTour: string;

  @ApiProperty({ type: Boolean, required: true })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  readonly rented: boolean;

  @ApiProperty({ type: String, required: true, example: '+55 (41) 99999-9999' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly phone: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '1234567-example-12345-12345',
  })
  @IsString()
  @IsOptional()
  readonly userID: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '1234567-example-12345-12345',
  })
  @IsString()
  @IsOptional()
  readonly homeId: string;

  @ApiProperty({ type: Date, required: true, example: Date.now() })
  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  @ApiProperty({ type: Date, required: true, example: Date.now() })
  @IsDate()
  @IsOptional()
  readonly updatedAt: Date;
}

export default PublicationDTO;
