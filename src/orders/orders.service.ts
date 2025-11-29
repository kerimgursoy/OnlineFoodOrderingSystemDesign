import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { ClientProxy } from '@nestjs/microservices';
//OrdersService handles CRUD operations and microservice communication
@Injectable()
export class OrdersService {
  constructor(
    //injects TypeORM repository for database interactions
    @InjectRepository(Order)
    private ordersRepo: Repository<Order>,

    //injects the RabbitMQ ClientProxy for event publishing
    @Inject('ORDERS_PUBLISHER')
    private client: ClientProxy,
  ) {}

  findAll() {
    return this.ordersRepo.find();
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async create(data: Partial<Order>) {
    // creates a new order entity and sets the initial status to pending
    const order = this.ordersRepo.create({
      ...data,
      status: 'PENDING',
    });
    const saved = await this.ordersRepo.save(order);

    // 🔴 Publish event to RabbitMQ
    //delivery microservice will consume this event
    void this.client.emit('order_created', {
      id: saved.id,
      customerName: saved.customerName,
      address: saved.address,
      totalPrice: saved.totalPrice,
      status: saved.status,
    });

    return saved;
  }

  async updateStatus(id: number, status: string) {
    const order = await this.findOne(id);
    order.status = status;
    const saved = await this.ordersRepo.save(order);

    // 🔴 Publish status update event
    void this.client.emit('order_status_updated', {
      id: saved.id,
      status: saved.status,
    });

    return saved;
  }
}
