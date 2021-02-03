import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

//User avatar no singular = pois é um único avatar por usuário
export default class UsersControllers {
    public async update(request: Request, response: Response): Promise<Response> {
        // const usersRepository = new UsersRepository();
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        //Aqui: vendo se tem arquivo e se nao tiver já atualiza
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        })
        return response.json(user);
    }
}