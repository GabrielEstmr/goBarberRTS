import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderMonthAvailabilityController {
    public async index(request: Request, response: Response): Promise<Response> {
        // const { provider_id, day, month, year } = request.body;//Primeira forma: também funciona

        const provider_id = request.params.provider_id;// com desestruração:const {provider_id}=request.params;
        const { day, month, year } = request.body;

        const listProviderDayAvailabilityService = container.resolve(ListProviderDayAvailabilityService);

        const availability = await listProviderDayAvailabilityService.execute({
            provider_id,
            day,
            month,
            year
        });

        return response.json(availability);
    }
}