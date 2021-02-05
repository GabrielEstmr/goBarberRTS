import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);//A partir desse momento todas as rotas DE PERFIL nao sao usaveis se nao estiver autenticado e nas rotas de perfil conseguimos o id o usuário

profileRouter.get('/', profileController.show);
profileRouter.put('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        old_password: Joi.string(),
        password: Joi.string(),
        password_confirmation: Joi.string().valid(Joi.ref('password')),//aqui : unico valor válido para password confirmation = password do campo anterior
    }
}), profileController.update);

export default profileRouter;