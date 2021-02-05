import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

// import UsersRepository from '@modules/users/infra/typeorm/Repositories/UserRepository';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';



const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
// import User from '../models/User';


const upload = multer(uploadConfig);//funciona como middleware > por isso vai dentro da funcao da rota
// upload.single('avatar') > nome do campo = avatar

usersRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }
}), usersController.create);

//PUT > possibilidade de atualizar todos os campos de uma linha/registro
//PATCH: auteração de apenas UM campo de um registro
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)


export default usersRouter;





























// // // //PUT > possibilidade de atualizar todos os campos de uma linha/registro
// // // //PATCH: auteração de apenas UM campo de um registro
// // // usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
// // //     try {
// // //         const updateUserAvatar = new UpdateUserAvatarService();

// // //         const user = await updateUserAvatar.execute({
// // //             user_id: request.user.id,
// // //             avatarFilename: request.file.filename,
// // //         })
// // //         return response.json(user);
// // //     } catch (err) {
// // //         return response.status(400).json({ error: err.message });
// // //     }
// // //     // console.log(request.file);
// // //     // // {
// // //     // //     fieldname: 'avatar',
// // //     // //     originalname: 'ThinkPad_T460_Spec.PDF',
// // //     // //     encoding: '7bit',
// // //     // //     mimetype: 'application/pdf',
// // //     // //     destination: 'C:\\Users\\GabrielRodrigues\\Desktop\\BAYER\\RocketSeat\\primeiro-projeto-node\\tmp',
// // //     // //     filename: '10d5a7d02849c9aa19fd-ThinkPad_T460_Spec.PDF',
// // //     // //     path: 'C:\\Users\\GabrielRodrigues\\Desktop\\BAYER\\RocketSeat\\primeiro-projeto-node\\tmp\\10d5a7d02849c9aa19fd-ThinkPad_T460_Spec.PDF',
// // //     // //     size: 29391
// // //     // // }
// // //     // return response.json({ ok: true });
// // // })


// // // export default usersRouter;
