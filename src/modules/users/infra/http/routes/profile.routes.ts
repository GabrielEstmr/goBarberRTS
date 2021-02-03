import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);//A partir desse momento todas as rotas DE PERFIL nao sao usaveis se nao estiver autenticado e nas rotas de perfil conseguimos o id o usuário

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;