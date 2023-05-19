import { setSeederFactory } from 'typeorm-extension';

import { Car } from '../entities/car.entity';

export default setSeederFactory(Car, (faker) => {
  const car = new Car();

  car.mark = faker.vehicle.model();
  car.model = faker.vehicle.model();
  car.price = Number(faker.random.numeric(4));
  car.rent = faker.datatype.boolean();
  car.img = faker.image.image();

  return car;
});
