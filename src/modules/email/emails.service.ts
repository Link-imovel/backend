import { Injectable } from '@nestjs/common';
import { SendEmailDTO } from './dto/create.dto';

import * as sgMail from '@sendgrid/mail';
import { IEmailService } from './interfaces/email.service';

sgMail.setApiKey(
  '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',
);

@Injectable()
export class EmailsService implements IEmailService {
  async sendEmail(data: SendEmailDTO): Promise<void> {
    await sgMail.send({
      to: data.email,
      from: 'josue.neneve@hotmail.com',
      subject: 'User Created',
      text: `Hello ${data.name}`,
      templateId: 'd-759e77ffe12c4ff384730e4236178ce0',
    });
  }
}
