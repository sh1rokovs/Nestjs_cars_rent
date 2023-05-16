import {
  Entity,
  ManyToMany,
  Column,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from 'src/database/entities/role.entity';

@Entity('users')
export class User {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'login', description: 'Логин пользователя' })
  @Column()
  username: string;

  @ApiProperty({ example: '*******', description: 'Пароль пользователя' })
  @Column()
  password: string;

  @ApiProperty({
    example: 'email@example.ru',
    description: 'Почта пользователя',
  })
  @Column()
  email: string;

  @ApiProperty({
    example: '+7 999 123 23 23',
    description: 'Телефон пользователя',
  })
  @Column()
  phone: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
