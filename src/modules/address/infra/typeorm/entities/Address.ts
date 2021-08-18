import User from '@modules/user/infra/typeorm/entities/User';
import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('address')
export default class Address {
  @PrimaryColumn()
  readonly id: string;

  @JoinColumn({ name: 'user_id' })
  @OneToOne(() => User)
  user_id: string;

  @Column()
  road: string;

  @Column()
  number: number;

  @Column()
  complement: string;

  @Column()
  cep: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
