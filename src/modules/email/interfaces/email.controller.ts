import { SendEmailDTO } from '../dto/create.dto';

interface IEmailController {
  sendEmail: (data: SendEmailDTO) => Promise<void>;
}

export type { IEmailController };
