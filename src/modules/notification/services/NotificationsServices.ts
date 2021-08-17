import { getCustomRepository } from 'typeorm';
import NotificationsRepository from '../infra/typeorm/repositories/NotificationsRepository';

import Notification from '../infra/typeorm/entities/Notification';

interface RecipientRequest {
  recipient_id?: string;
  id?: string;
}

export default class NotificationService {
  async show({ recipient_id }: RecipientRequest) {
    const notificationsRepository = getCustomRepository(
      NotificationsRepository,
    );
    let notifications: Notification[];

    notifications = await notificationsRepository.find({
      where: { recipient_id },
    });

    return notifications;
  }

  async update({ id }: RecipientRequest) {
    const notificationsRepository = getCustomRepository(
      NotificationsRepository,
    );

    const notification = await notificationsRepository.findOne({ id });

    notification.read = true;

    await notificationsRepository.save(notification);

    return notification;
  }
}
