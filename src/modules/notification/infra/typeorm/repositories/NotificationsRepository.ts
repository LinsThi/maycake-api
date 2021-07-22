import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationRepository from '@modules/notification/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notification/dtos/ICreateNotificationDTO';

import Notification from '../schemas/Notification';

export default class NotificationsRepository
  implements INotificationRepository
{
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    title,
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      title,
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}
