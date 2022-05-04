import nodemailer from 'nodemailer';
import { MailProvider, SendMailData } from '../mailProvider';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '8ebb1471fe879d',
    pass: '2513db1af8f07d',
  },
});

export class NodemailerProvider implements MailProvider {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feeget <iurysousa13@outlook.com>',
      to: 'Iury Sousa <iury_wemerson@hotmail.com>',
      subject: subject,
      html: body,
    });
  }
}
