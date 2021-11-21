interface IEmailService {
  sendEmail: (
    email: string,
    subject: string,
    templateName: 'resetPwd' | 'createAccount',
    variables: Record<string, unknown>,
  ) => Promise<void>;
}

export type { IEmailService };
