//Controller deve ter APENAS as métodos: index, show, create, update, delete




import { Request, Response } from 'express';
import { container } from 'tsyringe';


// import UsersRepository from '@modules/users/infra/typeorm/Repositories/UserRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsControllers {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        // const userRepository = new UsersRepository();
        // const { email, password } = request.booooooooody; >>tntando middleware de errors (quandi entra com login e senha)
        const authenticateUser = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticateUser.execute({
            email,
            password
        })

        delete user.password;

        return response.json({ user, token });


        // try {
        //     const { email, password } = request.body;
        //     const authenticateUser = new AuthenticateUserService();

        //     const { user, token } = await authenticateUser.execute({
        //         email,
        //         password
        //     })

        //     delete user.password;

        //     return response.json({ user, token });
        // } catch (err) {
        //     return response.status(err.statusCode).json({ error: err.message });
        // }
    }
}