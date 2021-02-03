import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

// import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
    public async create(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;//feito pelo middleware de autentificação
        const { provider_id, date } = request.body;//provider: quem vai marcar e date

        const parsedDate = parseISO(date);

        // const appointmentsRepository = new AppointmentsRepository();

        // const createAppointment = new CreateAppointmentService(appointmentsRepository);// criando variável com métodos do SERVICE

        const createAppointment = container.resolve(CreateAppointmentService);// criando variável com métodos do SERVICE

        const appointment = await createAppointment.execute({ date: parsedDate, provider_id, user_id });

        return response.json(appointment);


        // try {
        //     const { provider_id, date } = request.body;//provider: quem vai marcar e date

        //     const parsedDate = parseISO(date);

        //     const createAppointment = new CreateAppointmentService();// criando variável com métodos do SERVICE

        //     const appointment = await createAppointment.execute({ date: parsedDate, provider_id });

        //     return response.json(appointment);
        // } catch (err) {
        //     return response.status(400).json({ error: err.message });
        // }
    }
}