import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

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

  constructor(){
    if(!this.id) {
      this.id = uuid();
    }
  }
}