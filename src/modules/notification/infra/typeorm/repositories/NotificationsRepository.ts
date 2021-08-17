import { EntityRepository, Repository } from 'typeorm';
import Notification from '../entities/Notification';

@EntityRepository(Notification)
export default class NotificationRepositories extends Repository<Notification> {}
