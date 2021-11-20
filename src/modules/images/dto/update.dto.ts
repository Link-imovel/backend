import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UpdateImage } from '../interfaces/images';

export class UpdateImageDTO implements UpdateImage {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsOptional()
  readonly image: string;
}

export default UpdateImageDTO;
