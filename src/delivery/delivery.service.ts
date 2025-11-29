import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
// define a microservice controller in NestJS
//listens to events from the message broker
@Controller() // 👈 Add this decorator
export class DeliveryService {
  private readonly logger = new Logger(DeliveryService.name);

  constructor() {
    this.logger.log('🚀 DeliveryService initialized');
  }
  //eventpattern  subscribes to events from RabbitmQ
  //payload extracts the data sent with the event
  @EventPattern('order_created')
  handleOrderCreated(@Payload() data: any) {
    this.logger.log(
      `📦 New order received for delivery: ${JSON.stringify(data)}`,
    );
  }
  //eventpattern subscribes to status update events
  @EventPattern('order_status_updated')
  handleOrderStatusUpdated(@Payload() data: any) {
    this.logger.log(`🚚 Order status updated: ${JSON.stringify(data)}`);
  }
}
