import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from '../users/users.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './entity/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carsRepository: Repository<Car>,
    private readonly usersService: UsersService,
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

  async getAllNoRent(): Promise<Car[]> {
    return await this.carsRepository.find({
      where: {
        rent: false,
      },
      relations: {
        user: true,
      },
    });
  }

  async getAllRent(): Promise<Car[]> {
    return await this.carsRepository.find({
      where: {
        rent: true,
      },
      relations: {
        user: true,
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
