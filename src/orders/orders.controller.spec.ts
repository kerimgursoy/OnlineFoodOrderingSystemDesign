import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
//test suite for OrdersController
describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    //creates a temp NestJS testing module
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });
  //basic test case to verify that controller was instantiated successfully
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
