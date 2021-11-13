import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateAddress } from '../interfaces/addresses';

export class CreateAddressDTO implements CreateAddress {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  street2: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  ibge: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  number: number;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  zip: string;
}

export default CreateAddressDTO;
