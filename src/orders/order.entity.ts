import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

//@Entity() decorator specifies that this class is a TypeORM database entity
@Entity()
export class Order {
  //the unique ID of the order, auto increments
  @PrimaryGeneratedColumn()
  id: number;
  //column to store the customer's name
  @Column()
  customerName: string;

  //column to store the delivery address for the order
  @Column()
  address: string;
  //column to store the current status of the order
  @Column()
  status: string;
  //Column to store the total price of the order as a decimal number.
  @Column('decimal')
  totalPrice: number;
}

