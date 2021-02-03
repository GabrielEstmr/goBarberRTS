import { startOfHour, isBefore, getHours, format } from 'date-fns';//primeiro biblioteca e depois relativos
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';//AQUI > seria o proximo passo para a separacao via DDD
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';




// [OK] - Recebimento das informações;
// [  ] - Tratativa de erros/excessões
// [  ] - Acesso ao repositório;



interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
};

/* se Importar appointmentsRepository teremos mais de um REPOSITORY na Aplicação > nao pode */
/* Dependency Inversion */


// ROTA é que vai informar qual repositorio usar!!!

@injectable()
class CreateAppointmentService {
    // // Para JS
    // private appointmentsRepository: IAppointmentsRepository;
    // constructor(appointmentsRepository: IAppointmentsRepository) {
    //     this.appointmentsRepository = appointmentsRepository;
    // }

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,
    ) { };

    public async execute({ date, provider_id, user_id }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError("You can't create an appointment on a past date.");
        }

        if (user_id === provider_id) {
            throw new AppError("You can't create an appointment with yourself.");
        }

        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError(
                'You can only create appontments between 8am and 5pm.',
            );
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

        // promisse == thufy
        if (findAppointmentInSameDate) {
            // IMPORTANTE: Aqui > não temos acesso ao response/request > assim retornamos erros e nao o response > PEGA via try catch
            throw new AppError("This appointment has been already booked!");
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate,
        });



        // MONGODB Notifications
        const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h");
        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para ${dateFormated}`,
        })



        return appointment;
    }
}


export default CreateAppointmentService;


















// // // import Appointment from '../models/Appointment';
// // // import AppointmentsRepository from '../repositories/AppointmentsRepository';
// // // import { startOfHour } from 'date-fns';

// // // // [OK] - Recebimento das informações;
// // // // [  ] - Tratativa de erros/excessões
// // // // [  ] - Acesso ao repositório;



// // // interface Request {
// // //     provider: string;
// // //     date: Date;
// // // };

// // // /* se Importar appointmentsRepository teremos mais de um REPOSITORY na Aplicação > nao pode */
// // // /* Dependency Inversion */

// // // class CreateAppointmentService {

// // //     private appointmentsRepository: AppointmentsRepository;

// // //     //Component Did Mount
// // //     constructor(appointmentsRepository: AppointmentsRepository) {
// // //         this.appointmentsRepository = appointmentsRepository;
// // //     }

// // //     public execute({ date, provider }: Request): Appointment {
// // //         const appointmentDate = startOfHour(date);

// // //         const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);
// // //         if (findAppointmentInSameDate) {
// // //             // IMPORTANTE: Aqui > não temos acesso ao response/request > assim retornamos erros e nao o response
// // //             throw Error("This appointment has been already booked!");
// // //         }

// // //         const appointment = this.appointmentsRepository.create({
// // //             provider,
// // //             date: appointmentDate,
// // //         });

// // //         return appointment;
// // //     }
// // // }


// // // export default CreateAppointmentService;