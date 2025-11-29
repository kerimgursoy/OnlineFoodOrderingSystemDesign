import { Module } from '@nestjs/common';
import { DeliveryModule } from './delivery.module';
//root module for the delivery microservice application
@Module({
  imports: [DeliveryModule], // ONLY delivery logic
})
export class DeliveryAppModule {}
