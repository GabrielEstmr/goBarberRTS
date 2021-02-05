import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';//validação parametros rotas

//Segments > consegue validar os segmentos da requisição >>>> body, road parms, etc

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

//iMPORTANTE: Camada de infra pode se conectar com camada de infra
//              Mas camada de DOMINIO NAO PODE se comunicar com camada de infra DIRETAMENTE

//Aqui: uso do middleware de autentificação em todos os métodos desse rota;
// So fosse só um:   appointmentsRouter.get('/', ensureAuthenticated, async (request, response) => {
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date(),
        },
    }),
    appointmentsController.create,
);

//Aqui nao tem validação
appointmentsRouter.get('/me', providerAppointmentsController.index);


export default appointmentsRouter;






















// import { Router } from 'express';

// import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
// import AppointmentsController from '../controllers/AppointmentsController';

// const appointmentsRouter = Router();
// const appointmentsController = new AppointmentsController();

// //iMPORTANTE: Camada de infra pode se conectar com camada de infra
// //              Mas camada de DOMINIO NAO PODE se comunicar com camada de infra DIRETAMENTE

// //Aqui: uso do middleware de autentificação em todos os métodos desse rota;
// // So fosse só um:   appointmentsRouter.get('/', ensureAuthenticated, async (request, response) => {
// appointmentsRouter.use(ensureAuthenticated);

// // appointmentsRouter.get('/', async (request, response) => {
// //     console.log(request.user);
// //     const appointmentsRepository = getCustomRepository(AppointmentsRepository);
// //     const appointments = await appointmentsRepository.find();

// //     return response.json(appointments);
// // });



// // POST https://localhost:3333/appointments
// appointmentsRouter.post('/', appointmentsController.create);

// providersRouter.get('/:provider_id/day-availability', providerDayAvailabilityController.index);





// export default appointmentsRouter;
























// // // import { response, Router } from 'express';
// // // // import { uuid } from 'uuidv4';//Unic universal Id
// // // import { parseISO } from 'date-fns';

// // // // import Appointment from '../models/Appointment';
// // // import AppointmentsRepository from '../repositories/AppointmentsRepository';
// // // import CreateAppointmentService from '../services/CreateAppointmentService';

// // // const appointmentsRouter = Router();
// // // const appointmentsRepository = new AppointmentsRepository();

// // // //Soc Separation of concerns

// // // // // Tipagem TS
// // // // interface Appointments {
// // // //     id: string;
// // // //     provider: string;
// // // //     date: Date;
// // // // };

// // // // Declaração + Associação Tipagem
// // // // const appointments: Appointment[] = [];


// // // // IMPORTANTE ROTA: Receber requisição > chamar arquivo > devolver Resposta APENASS


// // // appointmentsRouter.get('/', (request, response) => {
// // //     const appointments = appointmentsRepository.all();
// // //     return response.json(appointments);
// // // });



// // // // POST https://localhost:3333/appointments
// // // appointmentsRouter.post('/', (request, response) => {
// // //     try {
// // //         const { provider, date } = request.body;//provider: quem vai marcar e date

// // //         const parsedDate = parseISO(date);

// // //         const CreateAppointment = new CreateAppointmentService(appointmentsRepository);

// // //         const appointment = CreateAppointment.execute({ date: parsedDate, provider });

// // //         return response.json(appointment);
// // //     } catch (err) {
// // //         return response.status(400).json({ error: err.message });
// // //     }






// // //     // // // const appointmentDate = startOfHour(parsedDate);

// // //     // // // // const findAppointmentInSameDate = appointments.find(e => isEqual(parsedDate, e.date));
// // //     // // // const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);
// // //     // // // if (findAppointmentInSameDate) {
// // //     // // //     return response
// // //     // // //         .status(400)
// // //     // // //         .json({ message: 'This appointment has been already booked' })
// // //     // // // }

// // //     // // // // const appointment = {
// // //     // // // //     id: uuid(),
// // //     // // // //     provider,
// // //     // // // //     date: parsedDate,
// // //     // // // // }

// // //     // // // // const appointment = new Appointment(provider, parsedDate)

// // //     // // // const appointment = appointmentsRepository.create({
// // //     // // //     provider,
// // //     // // //     date: appointmentDate,
// // //     // // // });


// // //     // // // // appointments.push(appointment);
// // //     // // // // return response.json({ message: 'Hello World' });


// // //     // // // // return response.json(appointment);
// // // });





// // // export default appointmentsRouter;


// // // //Rota: passa a nao ter mais responsbilidade do formato dos dados (Model) e maneira que são armazenados/manipulações/criar/deletar...etc (repository)

