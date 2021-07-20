import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Expose } from 'class-transformer';

@Entity('products')
export default class Products {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  value: string;

  @Column()
  photo: string;

  @Expose({ name: 'product_url' })
  getPhotoUrl(): string {
    return `${process.env.APP_API_URL}/filesProduct/${this.photo}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
