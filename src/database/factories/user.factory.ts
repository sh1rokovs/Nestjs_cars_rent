import { setSeederFactory } from 'typeorm-extension';

import { User } from '../entities/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();

  user.username = faker.internet.userName();
  user.password = faker.internet.password();
  user.email = faker.internet.email(user.username, 'example');
  user.phone = faker.phone.number();

  return user;
});
