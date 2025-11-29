import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryService } from './delivery.service';
//test suite for delivery service
describe('DeliveryService', () => {
  let service: DeliveryService;

  beforeEach(async () => {
    //creates a testing module for DeliveryService
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryService],
    }).compile();

    service = module.get<DeliveryService>(DeliveryService);
  });
  // test to ensure service instance is successfully created
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
