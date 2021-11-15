import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateImage } from '../interfaces/images';

export class CreateImageDTO implements CreateImage {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  readonly image: string;
}

export default CreateImageDTO;
