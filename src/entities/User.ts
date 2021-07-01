import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export default class User {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
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

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}
