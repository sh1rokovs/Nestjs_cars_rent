import { setSeederFactory } from 'typeorm-extension';

import { Role } from '../entities/role.entity';

export default setSeederFactory(Role, () => {
  const role = new Role();

  role.value = 'admin';
  role.description = 'Администратор';

  return role;
});
