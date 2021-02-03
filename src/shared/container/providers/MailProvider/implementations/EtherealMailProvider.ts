import IMailProvider from '../models/IMailProvider';//Metodos
import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import ISendMailDTO from '../dto/ISendMailDTO';

// Nao tem problema usar um Provider dentro de outro >> em vez de fazer no service
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/ImailTemplateProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
    // //O que está no constructor: para ser executado uma unica vez no server


    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        // const account = await nodemailer.createTestAccount();//nao pode usar async com constructor
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                }
            });
            this.client = transporter;
        });
    }

    public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
        const message = await this.client.sendMail({
            from: {
                name: from?.name || 'Equipe GoBarber',
                address: from?.email || 'equipe@gobarber.com.br',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject: subject,
            html: await this.mailTemplateProvider.parse(templateData),
            // // html:'',
        });

        console.log('Message sent:', message.messageId);
        console.log('Preview', nodemailer.getTestMessageUrl(message))
    }
}