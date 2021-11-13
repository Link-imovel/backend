import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsObject,
} from 'class-validator';
import UpdateAddressDTO from 'src/modules/addresses/dto/update.dto';
import UpdateImageDTO from 'src/modules/images/dto/update.dto';
import { UpdateHome } from '../interfaces/homes';

export class UpdateHomeDTO implements UpdateHome {
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
  readonly room: number;

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

  @ApiProperty({ type: Number, required: true })
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  readonly buildAt: Date;

  @ApiProperty({ type: Number, required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly description: string;

  @ApiProperty({ type: () => UpdateAddressDTO, required: true })
  @IsObject()
  @IsNotEmpty()
  @IsOptional()
  readonly address: UpdateAddressDTO;

  @ApiProperty({ type: () => UpdateImageDTO, required: true })
  @IsNotEmpty()
  @IsOptional()
  readonly images: UpdateImageDTO | UpdateImageDTO[];
}

export default UpdateHomeDTO;
