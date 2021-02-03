//IMPORTANTE!!! Se nao for criar método nenhum em especial > nao precisa criar Repository, só usar os métodos disponíveis no TypeORM
// import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';


import AppError from '@shared/errors/AppError';


interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }

    public async execute({ name, email, password }: IRequest): Promise<User> {
        // const usersRepository = getRepository(User);
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user
    }
}

export default CreateUserService;