import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { UpdateAddress } from '../interfaces/addresses';

export class UpdateAddressDTO implements UpdateAddress {
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

  @ApiProperty({ type: String, required: false })
  @IsNumber()
  @IsOptional()
  latitude: number;

  @ApiProperty({ type: String, required: false })
  @IsNumber()
  @IsOptional()
  longitude: number;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  zip: string;
}

export default UpdateAddressDTO;
