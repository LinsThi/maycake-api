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
import { Expose } from 'class-transformer';

import Products from '@modules/product/infra/typeorm/entities/Product';
import User from '@modules/user/infra/typeorm/entities/User';
import Address from '@modules/address/infra/typeorm/entities/Address';

@Entity('sales')
export default class Sale {
  @PrimaryColumn()
  readonly id: string;

  @JoinColumn({ name: 'id_user_buying' })
  @OneToOne(() => User, { eager: true })
  id_user_buying: string;

  @JoinColumn({ name: 'id_product_sold' })
  @OneToOne(() => Products, { eager: true })
  id_product_sold: string;

  @Column()
  value: string;

  @Column()
  status: string;

  @Column()
  confirmPay: string;

  @JoinColumn({ name: 'address_id_user' })
  @OneToOne(() => Address, { eager: true })
  address_id_user: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @Column()
  methodpay: string;

  @Column()
  troco: string;

  @Expose({ name: 'pay_url' })
  getPayUrl(): string | null {
    return this.confirmPay
      ? `${process.env.APP_API_URL}/filesPays/${this.confirmPay}`
      : null;
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
