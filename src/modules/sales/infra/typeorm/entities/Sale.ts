import {
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import Products from '@modules/product/infra/typeorm/entities/Product';
import User from '@modules/user/infra/typeorm/entities/User';

@Entity('sales')
export default class Sale {
  @PrimaryColumn()
  readonly id: string;

  @JoinColumn({ name: 'id_user_buying' })
  @OneToOne(() => User)
  id_user_buying: string;

  @JoinColumn({ name: 'id_product_sold' })
  @OneToOne(() => Products)
  id_product_sold: string;

  @Column()
  value: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
