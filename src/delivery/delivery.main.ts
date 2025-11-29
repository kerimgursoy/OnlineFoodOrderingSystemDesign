import { NestFactory } from '@nestjs/core';
import { DeliveryAppModule } from './delivery.app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // creates a NestJS microservice to use RabbitMQ Transport.
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DeliveryAppModule,
    {
      transport: Transport.RMQ, // specifies RabbitMQ as the transport layer
      options: {
        urls: ['amqp://guest:guest@localhost:5672'], // RabbitMQ connection URL
        queue: 'orders_queue', // the nameo f the queue to listen to for events
        queueOptions: {
          durable: true, // ensure queue persists even if broker restarts
        },
      },
    },
  );
  // starts the microservice listener
  await app.listen();
  console.log('🚀 Delivery microservice is running...');
}

bootstrap();
