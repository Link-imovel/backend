interface SendEmail {
  name: string;
  email: string;
  subject: string;
  templateName: 'resetPwd' | 'createAccount';
  variables: Record<string, unknown>;
}

export type { SendEmail };
