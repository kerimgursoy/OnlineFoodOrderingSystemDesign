import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
//defines the basic structure of the delivery microservice logic

@Module({
  controllers: [DeliveryService],
})
export class DeliveryModule {}
