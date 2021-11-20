import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailDTO } from './dto/create.dto';
import { EmailsService } from './emails.service';
import { IEmailController } from './interfaces/email.controller';

@Controller('email')
export class EmailController implements IEmailController {
  constructor(private emailService: EmailsService) {}

  @Post()
  async sendEmail(@Body() data: SendEmailDTO): Promise<void> {
    await this.emailService.sendEmail(data);
  }
}
