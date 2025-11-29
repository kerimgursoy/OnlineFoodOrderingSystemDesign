import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { DeliveryModule } from '../delivery/delivery.module';
//defines the structure and dependencies for the order logic
@Module({
  imports: [
    //registers the order entity with TypeORM for db operations
    TypeOrmModule.forFeature([Order]),
    DeliveryModule,
    //registers the RabbitMQ client for outgoing communication
    ClientsModule.register([
      {
        name: 'ORDERS_PUBLISHER', // injection token
        transport: Transport.RMQ, // specify RabbitMQ as transport layer
        options: {
          urls: ['amqp://guest:guest@localhost:5672'], // connection string for RabbitMQ broker
          queue: 'orders_queue', // the target queue name where events will be sent
          queueOptions: {
            durable: true, // ensure queue survives broker restarts
          },
        },
      },
    ]),
  ],
  controllers: [OrdersController], // api endpoints for crud operations
  providers: [OrdersService], //business logic provider
})
export class OrdersModule {}
