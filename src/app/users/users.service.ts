import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from '../roles/dto/add-role.dto';
import { RolesService } from '../roles/roles.service';
import { AddCarDto } from '../cars/dto/add-car.dto';
import { CarsService } from '../cars/cars.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly carsService: CarsService,
  ) {}

  async createUser(createUser: CreateUserDto): Promise<User> {
    const user = new User();
    const role = await this.rolesService.getRole('user');

    user.username = createUser.username;
    user.email = createUser.email;
    user.password = createUser.password;
    user.phone = createUser.phone;
    user.roles = [role];
    user.roles = [];

    return await this.usersRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: { roles: true, cars: true },
    });
  }

  async getOneUser(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id: id });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
      relations: {
        roles: true,
        cars: true,
      },
    });
  }

  async addRole(addRole: AddRoleDto): Promise<AddRoleDto | void> {
    const user = await this.usersRepository.findOne({
      where: {
        id: addRole.userId,
      },
    });
    const role = await this.rolesService.getRole(addRole.value);

    if (role && user) {
      user.roles = [role];

      await this.usersRepository.save(user);

      return addRole;
    }

    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  async addCar(addCar: AddCarDto): Promise<AddCarDto | void> {
    const user = await this.usersRepository.findOne({
      where: {
        id: addCar.userId,
      },
    });
    const car = await this.carsService.getCar(addCar.id);

    if (car && user) {
      user.cars = [car];

      await this.usersRepository.save(user);

      return addCar;
    }

    throw new HttpException('Машина не найдена', HttpStatus.NOT_FOUND);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
