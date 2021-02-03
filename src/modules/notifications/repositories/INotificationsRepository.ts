import ICreationNotificationDTO from '../dtos/ICreationNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationRespository {
    create(data: ICreationNotificationDTO): Promise<Notification>;//separou num DTO pois é mais de um Dado (é um objeto de dados)
};