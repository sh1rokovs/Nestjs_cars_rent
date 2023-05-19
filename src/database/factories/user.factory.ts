import { setSeederFactory } from 'typeorm-extension';

import { User } from '../entities/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.username = faker.name.firstName('male');
  user.password = faker.name.lastName('male');
  user.email = 'asfasfasf';
  user.phone = '12312412414';

  return user;
});
