import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Exclude, Expose } from 'class-transformer';

@Entity('users')
export default class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  cpf: string;

  @Column()
  admin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string {
    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
