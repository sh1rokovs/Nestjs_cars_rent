import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { User } from 'src/app/users/entity/user.entity';

@Entity('cars')
export class Car {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'toyota', description: 'Марка машины' })
  @Column()
  mark: string;

  @ApiProperty({ example: 'corolla', description: 'Модель машины' })
  @Column()
  model: string;

  @ApiProperty({ example: '10000', description: 'Цена аренды' })
  @Column()
  price: number;

  @ApiProperty({ example: 'true', description: 'Статут аренды' })
  @Column()
  rent: boolean;

  @ApiProperty({ example: '12334.jpg', description: 'Фотография автомобиля' })
  @Column()
  img: string;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn()
  user: User[];
}
