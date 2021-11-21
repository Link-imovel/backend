import { Injectable } from '@nestjs/common';

import * as sgMail from '@sendgrid/mail';
import { emailTemplates } from './constants';
import { IEmailService } from './interfaces/email.service';

@Injectable()
export class EmailsService implements IEmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendEmail(
    email: string,
    subject: string,
    templateName: 'resetPwd' | 'createAccount',
    variables: Record<string, unknown>,
  ): Promise<void> {
    await sgMail.send({
      to: email,
      subject,
      from: 'josue.neneve@hotmail.com',
      dynamicTemplateData: variables,
      templateId: emailTemplates[templateName],
    });
  }
}
