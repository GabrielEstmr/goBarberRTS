import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';


import ListProviderAppointments from '@modules/appointments/services/ListProviderAppointments';

export default class ProviderAppointmentsController {
    //index: listagem de todos os Dados
    public async index(request: Request, response: Response): Promise<Response> {
        const provider_id = request.user.id;//feito pelo middleware de autentificação
        const { day, month, year } = request.body;//provider: quem vai marcar e date

        const listProviderAppointments = container.resolve(ListProviderAppointments);

        const appointments = await listProviderAppointments.execute({
            provider_id,
            day,
            month,
            year
        });

        return response.json(appointments);
    }
}