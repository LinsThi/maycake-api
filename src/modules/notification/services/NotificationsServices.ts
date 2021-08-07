import NotificationsRepository from '../infra/typeorm/repositories/NotificationsRepository';

interface RecipientRequest {
  recipient_id: string;
}

export default class NotificationService {
  async show({ recipient_id }: RecipientRequest) {
    const notificationsRepository = new NotificationsRepository();

    const notifications = await notificationsRepository.show({ recipient_id });

    return notifications;
  }
}
