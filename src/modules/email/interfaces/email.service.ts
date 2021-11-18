import { SendEmailDTO } from '../dto/create.dto';

interface IEmailService {
  sendEmail: (data: SendEmailDTO) => Promise<void>;
}

export type { IEmailService };
