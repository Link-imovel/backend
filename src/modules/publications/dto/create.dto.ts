import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import CreateHomeDTO from 'src/modules/homes/dto/create.dto';
import { CreatePublication } from '../interfaces/publication';

export class CreatePublicationDTO implements CreatePublication {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsOptional()
  readonly userId: string;

  @ApiProperty({ type: String, nullable: true })
  @IsString()
  readonly title: string;

  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  readonly virtualTour?: string;

  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  readonly phone: string;

  @ApiProperty({ type: () => CreateHomeDTO, required: true })
  @IsNotEmpty()
  @IsObject()
  readonly home: CreateHomeDTO;
}

export default CreatePublicationDTO;
