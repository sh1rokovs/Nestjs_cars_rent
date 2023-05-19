import { define } from 'typeorm-seeding';
import {
  randUserName,
  randPassword,
  randEmail,
  randPhoneNumber,
} from '@ngneat/falso';

import { User } from '../entities/user.entity';

define(User, () => {
  const user = new User();
  user.username = randUserName();
  user.password = randPassword();
  user.email = randEmail();
  user.phone = randPhoneNumber();

  return user;
});
