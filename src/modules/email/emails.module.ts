import { Module } from '@nestjs/common';
import { EmailController } from './emails.controller';
import { EmailsService } from './emails.service';

@Module({
  imports: [],
  controllers: [EmailController],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
