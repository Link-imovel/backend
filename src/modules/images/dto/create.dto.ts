import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { CreateImage } from '../interfaces/images';

export class CreateImageDTO implements CreateImage {
  @ApiProperty({ type: Buffer, required: true })
  @Type(() => Buffer)
  @IsNotEmpty()
  readonly image: Buffer;
}

export default CreateImageDTO;
