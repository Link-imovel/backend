import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateImage } from '../interfaces/images';

export class UpdateImageDTO implements UpdateImage {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  readonly image: string;
}

export default UpdateImageDTO;
