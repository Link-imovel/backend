import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';

@Module({
  imports: [],
  controllers: [],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
