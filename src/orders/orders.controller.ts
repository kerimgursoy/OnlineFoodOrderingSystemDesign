import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
//handles REST API requests with the base route
//acts as the gateway to OrdersService business logic
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  //retrieves all orders
  @Get()
  getAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }
  //retrieves a single order by its ID
  //@Param extracts the ID parameter from the URL
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(Number(id));
  }
  //creates new order
  //@BOdy extracts the request body containing order details
  @Post()
  create(@Body() body: Partial<Order>): Promise<Order> {
    return this.ordersService.create(body);
  }
  //updates the status of an order, also triggers RabbitMQ
  //param and body extract the order ID and the new status
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Order> {
    return this.ordersService.updateStatus(Number(id), status);
  }
}
