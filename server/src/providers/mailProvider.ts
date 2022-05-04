export interface SendMailData {
  subject: string;
  body: string;
}

export interface MailProvider {
  sendMail: (data: SendMailData) => Promise<void>;
}
