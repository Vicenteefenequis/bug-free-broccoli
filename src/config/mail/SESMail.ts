import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';
import mailConfig from '@config/mail/mail';

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface ISendMail {
  to: IMailContact;
  subject: string;
  from?: IMailContact;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({ to, from, subject, templateData }: ISendMail) {
    const mailTemplate = new HandlebarsMailTemplate();
    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
      }),
    });

    const { email, name } = mailConfig.defaults.from;

    await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
  }
}
