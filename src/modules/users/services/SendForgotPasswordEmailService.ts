import { injectable, inject } from 'tsyringe';
import path from 'path';
// import AppError from '@shared/errors/AppError';

// import User from '../infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokensRepository';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')//embuto o EtherealMailProvider
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokenRepository,
    ) { }

    public async execute({ email }: IRequest): Promise<void> {

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error("User does not exists.");
        }

        const { token } = await this.userTokensRepository.generate(user.id);

        const forgotPasswordEmailTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[GoBarber] Recuperação de Senha',
            templateData: {
                file: forgotPasswordEmailTemplate,
                variables: {
                    name: user.name,
                    // link: `http://localhost:3000/reset_password?token=${token}`,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                }
            }
        });
    }
}

export default SendForgotPasswordEmailService;