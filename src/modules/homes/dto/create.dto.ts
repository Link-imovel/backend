import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsObject,
  IsOptional,
} from 'class-validator';
import { CreateHome } from '../interfaces/homes';
import CreateAddressDTO from 'src/modules/addresses/dto/create.dto';
import CreateImageDTO from 'src/modules/images/dto/create.dto';

export class CreateHomeDTO implements CreateHome {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  readonly ref: string;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  readonly totalArea: number;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  readonly value: number;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  readonly room: number;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  readonly bedroom: number;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  readonly bathroom: number;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  readonly kitchen: number;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  readonly garage: number;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  readonly serviceArea: number;

  @ApiProperty({ type: Number, required: true })
  @IsString()
  @IsNotEmpty()
  readonly buildAt: Date;

  @ApiProperty({ type: Number, required: true })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ type: () => CreateAddressDTO, required: true })
  @IsObject()
  @IsNotEmpty()
  readonly address: CreateAddressDTO;

  @ApiProperty({ type: () => CreateImageDTO, required: false })
  @IsNotEmpty()
  @IsOptional()
  readonly images: CreateImageDTO | CreateImageDTO[];
}

export default CreateHomeDTO;
