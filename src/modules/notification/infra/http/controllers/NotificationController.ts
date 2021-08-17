import { Request, response, Response } from 'express';
import NotificationService from '@modules/notification/services/NotificationsServices';

class NotificationController {
  async show(request: Request, response: Response) {
    const recipient_id = request.user_id;

    const notificationsService = new NotificationService();

    const notifications = await notificationsService.show({ recipient_id });

    return response.json(notifications);
  }

  async update(request: Request, response: Response) {
    const { id } = request.body;

    const notificationsService = new NotificationService();

    const notification = await notificationsService.update({ id });

    return response.json(notification);
  }
}

export default new NotificationController();
