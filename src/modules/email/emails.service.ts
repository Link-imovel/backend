import { Injectable } from '@nestjs/common';
import { SendEmailDTO } from './dto/create.dto';

import * as sgMail from '@sendgrid/mail';
import { IEmailService } from './interfaces/email.service';

@Injectable()
export class EmailsService implements IEmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

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
