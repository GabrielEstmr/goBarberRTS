import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

// Repositorio: DETENTOR de tudo o que faz operações com os dados
//extends Repository<Appointment> >>>> extende a classe Repository e Recebe o Model > Appointment
//  Como se fizesse o import/extensão de todas os métodos
class AppointmentsRepository implements IAppointmentsRepository {

    private ormRepository: Repository<Appointment>;
    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    // Primeiro Método da Classe
    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date: date }
        })
        return findAppointment;
    }

    public async create({ provider_id, date, user_id }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, user_id, date });

        await this.ormRepository.save(appointment);
        //La está um metodo apenas mas aqui a gente faz as duas coisas

        return appointment;
    };

    //Raw() > passa pro Banco de Dados diretamente sem permitir que ele interprete como data
    //fin > varios >>>>unico > findOne
    // Promise<Appointment[] >>  quando é array automaticamente pode ser array nulo tbm ai nao precisa de "|"
    public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');//se meu mes nao tiver dois digitos: completa no começo com 0
        const appointments = await this.ormRepository.find({
            where: {
                provider_id: provider_id,
                date: Raw(dateFieldName => `to_char(${dateFieldName},'MM-YYYY') = '${parsedMonth}-${year}'`)
            }
        })
        return appointments;
    };


    public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const parsedDay = String(day).padStart(2, '0');//se meu mes nao tiver dois digitos: completa no começo com 0
        const parsedMonth = String(month).padStart(2, '0');
        const appointments = await this.ormRepository.find({
            where: {
                provider_id: provider_id,
                date: Raw(dateFieldName => `to_char(${dateFieldName},'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`)
            }
        })
        return appointments;
    };

}

export default AppointmentsRepository;





























// // // // import { isEqual } from 'date-fns';
// // // // import Appointment from '../models/Appointment';

// // // // //DTO = Data Transfer Object
// // // // interface CreateAppointmentDTO {
// // // //     provider: string;
// // // //     date: Date;
// // // // }

// // // // // Repositorio: DETENTOR de tudo o que faz operações com os dados
// // // // class AppointmentsRepository {
// // // //     private appointments: Appointment[];//appointments = array de Appointment/ private: variavel nao acessivel fora da classe

// // // //     constructor() {
// // // //         this.appointments = [];// iniciando appointments
// // // //     }
// // // //     //Appointment[] > Array de Appointment
// // // //     public all(): Appointment[] {
// // // //         return this.appointments;
// // // //     }

// // // //     // Retorn: Appointment ou null
// // // //     public findByDate(date: Date): Appointment | null {
// // // //         const findAppointment = this.appointments.find(e => isEqual(date, e.date));
// // // //         return findAppointment || null;//se nao encontrar: null
// // // //     }

// // // //     //acessível fora da classe > "": Appointment" > formato do return
// // // //     //provider: string, date: Date
// // // //     public create({ provider, date }: CreateAppointmentDTO): Appointment {
// // // //         const appointment = new Appointment({ provider, date });
// // // //         this.appointments.push(appointment);
// // // //         return appointment;
// // // //     }
// // // // }

// // // // export default AppointmentsRepository;