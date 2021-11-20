import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendEmailDTO {
  @ApiProperty({ type: String, required: true })
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  email: string;
}
