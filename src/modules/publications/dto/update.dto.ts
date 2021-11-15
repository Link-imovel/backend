import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import UpdateHomeDTO from 'src/modules/homes/dto/update.dto';
import { UpdatePublication } from '../interfaces/publication';

export class UpdatePublicationDTO implements UpdatePublication {
  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  readonly reserved?: boolean;

  @ApiProperty({ type: Boolean, required: false })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly views?: number;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  readonly virtualTour?: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  readonly phone: string;

  @ApiProperty({ type: () => UpdateHomeDTO, required: false })
  @IsObject()
  @IsNotEmpty()
  @IsOptional()
  readonly home?: UpdateHomeDTO;
}

export default UpdatePublicationDTO;
