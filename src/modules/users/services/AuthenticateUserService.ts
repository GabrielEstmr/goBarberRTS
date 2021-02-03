// import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

//Promise<void> = Promisse(vazio)
@injectable()
class AuthenticateUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }

    public async execute({ email, password }: IRequest): Promise<IResponse> {


        //Pegando Objeto do DB
        //Saber se método precisa de await: colocar mouse por cime e ver se retorna uma promisse
        const user = await this.usersRepository.findByEmail(email);

        //Se nao achou
        if (!user) {
            throw new AppError("Incorrect email/password combination.", 401);
        }

        //Comparando password
        const passwordMatched = await this.hashProvider.compareHash(password, user.password);//boolean

        if (!passwordMatched) {
            throw new AppError("Incorrect email/password combination.", 401);
        }

        //Usuário autenticado > via http://www.md5.cz/  >>> NUNCA pode ir pro FRONT END
        //cd1b41288363d4519d5ca472a4cea62c = secret (nome que eles dao) = chave

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: user.id,//sempre
            expiresIn: expiresIn
        });


        return {
            user,
            token
        };

    }
}


export default AuthenticateUserService;