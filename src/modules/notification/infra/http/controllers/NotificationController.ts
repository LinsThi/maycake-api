import { Request, Response } from 'express';
import NotificationService from '@modules/notification/services/NotificationsServices';

class NotificationController {
  async show(request: Request, response: Response) {
    const recipient_id = request.user_id;

    const notificationsService = new NotificationService();

    let notifications = await notificationsService.show({ recipient_id });

    return response.json(notifications);
  }
}

export default new NotificationController();
