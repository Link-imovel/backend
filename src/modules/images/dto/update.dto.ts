import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateImage } from '../interfaces/images';

export class UpdateImageDTO implements UpdateImage {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ type: Buffer, required: true })
  @Type(() => Buffer)
  @IsNotEmpty()
  readonly image: Buffer;
}

export default UpdateImageDTO;
