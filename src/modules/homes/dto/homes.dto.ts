import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Homes } from '../interfaces/homes';

export class HomesDTO implements Homes {
  @ApiProperty({
    type: String,
    required: true,
    example: '1234567-example-12345-12345',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly id: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly type: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly ref: string;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly totalArea: number;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly value: number;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly rom: number;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly bedroom: number;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly bathroom: number;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly kitchen: number;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly garage: number;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly serviceArea: number;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly buildA: string;

  @ApiProperty({ type: Date, required: true, example: Date.now() })
  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  @ApiProperty({ type: Date, required: true, example: Date.now() })
  @IsDate()
  @IsOptional()
  readonly updatedAt: Date;
}

export default HomesDTO;
