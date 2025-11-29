import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
//test suite for OrdersService
describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    //create temp NestJS testing module
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });
  //basic test to verify that service instantiated successfully
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
