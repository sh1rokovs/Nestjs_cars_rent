import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCarDto } from './dto/create-car.dto';
import { Car } from '../../database/entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carsRepository: Repository<Car>,
  ) {}

  async createCar(createCar: CreateCarDto): Promise<Car> {
    const car = new Car();

    car.mark = createCar.mark;
    car.model = createCar.model;
    car.price = createCar.price;
    car.rent = false;
    car.img = createCar.img;

    return await this.carsRepository.save(car);
  }

  async getCar(id: number): Promise<Car> {
    return await this.carsRepository.findOneBy({ id: id });
  }

  async getAllNoRent(): Promise<Car[]> {
    return await this.carsRepository.find({
      where: {
        rent: false,
      },
    });
  }

  async getAllRent(): Promise<Car[]> {
    return await this.carsRepository.find({
      where: {
        rent: true,
      },
    });
  }

  async rentCar(id: number): Promise<Car> {
    const car = await this.carsRepository.findOneBy({ id: id });

    car.rent = true;

    return await this.carsRepository.save(car);
  }

  async unrentCar(id: number): Promise<Car> {
    const car = await this.carsRepository.findOneBy({ id: id });

    car.rent = false;

    return await this.carsRepository.save(car);
  }

  async removeCar(id: number): Promise<void> {
    await this.carsRepository.findOneBy({ id: id });
  }
}
