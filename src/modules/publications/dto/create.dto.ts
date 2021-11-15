import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import CreateHomeDTO from 'src/modules/homes/dto/create.dto';
import { CreatePublication } from '../interfaces/publication';

export class CreatePublicationDTO implements CreatePublication {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  readonly virtualTour?: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  readonly phone: string;

  @ApiProperty({ type: () => CreateHomeDTO, required: false })
  @IsNotEmpty()
  @IsObject()
  readonly home: CreateHomeDTO;
}

export default CreatePublicationDTO;
