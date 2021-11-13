import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Addresses } from '../interfaces/addresses';

export class AddressesDTO implements Addresses {
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
  street: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  street2: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  state: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  ibge: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  neighborhood: string;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  number: number;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  zip: string;

  @ApiProperty({ type: Date, required: true, example: Date.now() })
  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  @ApiProperty({ type: Date, required: true, example: Date.now() })
  @IsDate()
  @IsOptional()
  readonly updatedAt: Date;
}

export default AddressesDTO;
