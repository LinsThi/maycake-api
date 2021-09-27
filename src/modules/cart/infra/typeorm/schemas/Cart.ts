import Products from '@modules/product/infra/typeorm/entities/Product';
import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('cart')
class Cart {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  user_id: string;

  @Column()
  products: Products[];
}

export default Cart;
