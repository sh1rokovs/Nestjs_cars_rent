import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { User } from '../entities/user.entity';
import { Car } from '../entities/car.entity';
import { Role } from '../entities/role.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    // role
    const roleFactory = await factoryManager.get(Role);

    await roleFactory.saveMany(1);

    // car
    const carFactory = await factoryManager.get(Car);

    await carFactory.saveMany(3);

    // user
    const userFactory = await factoryManager.get(User);

    await userFactory.saveMany(5);
  }
}
