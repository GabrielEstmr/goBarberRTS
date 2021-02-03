import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '../schemas/Notification';
import ICreationNotificationDTO from '@modules/notifications/dtos/ICreationNotificationDTO';



class NotificationsRepository implements INotificationsRepository {

    private ormRepository: MongoRepository<Notification>;
    constructor() {
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create({ content, recipient_id }: ICreationNotificationDTO): Promise<Notification> {
        const notification = this.ormRepository.create({
            content,
            recipient_id,//Aqui: permite todos os campos da tabela mas usa aqueles que tem-se que preencher (read nao tem pois tem valor default)
        })

        await this.ormRepository.save(notification);

        return notification;
    };


}

export default NotificationsRepository;


