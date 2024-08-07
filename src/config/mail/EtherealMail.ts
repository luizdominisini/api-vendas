import nodemailer from "nodemailer";
import HandlebarsMailTemplate from "./HandlebarsMailTemplate";

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
  from?: IMailContact;
  to: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

class EtheralMail {
  static async sendMail({
    from,
    to,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate();
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = await transporter.sendMail({
      from: {
        name: from?.name || "Equipe Api Vendas",
        address: from?.email || "EquipeApiVendas@gmail.com",
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: subject,
      html: await mailTemplate.parser(templateData),
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export default EtheralMail;
