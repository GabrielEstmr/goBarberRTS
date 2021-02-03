//Controller deve ter APENAS as métodos: index, show, create, update, delete
import { container } from 'tsyringe';

// import UsersRepository from '@modules/users/infra/typeorm/Repositories/UserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';


import { Request, Response } from 'express';

export default class UsersControllers {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        // const usersRepository = new UsersRepository();


        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password;//nao reconheceu mas existe

        return response.json(user);



    }
}