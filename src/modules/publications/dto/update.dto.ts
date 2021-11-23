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
  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  readonly title: string;

  @ApiProperty({ type: Boolean, nullable: true })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  readonly reserved: boolean;

  @ApiProperty({ type: Boolean, nullable: true })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly views: number;

  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  readonly virtualTour: string;

  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  readonly phone: string;

  @ApiProperty({ type: () => UpdateHomeDTO, nullable: true })
  @IsObject()
  @IsNotEmpty()
  @IsOptional()
  readonly home: UpdateHomeDTO;
}

export default UpdatePublicationDTO;
