//Controller deve ter APENAS as métodos: index, show, create, update, delete

//IMPORTENTE: colocou aqui e nao em UsersController pois é atualização de um usuário LOGADo e nao qualquer um


import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {

    public async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute({
            user_id,
        });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
        return response.json(userWithoutPassword);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { name, email, old_password, password } = request.body;
        const updateProfile = container.resolve(UpdateProfileService);
        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            old_password,
            password,
        });
        delete user.password;//nao reconheceu mas existe

        return response.json(user);
    }
}