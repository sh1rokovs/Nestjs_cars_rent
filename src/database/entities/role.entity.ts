import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('roles')
export class Role {
  @ApiProperty({ example: '1', description: 'Идентфикатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Пользователь', description: 'Описание роли' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: 'user', description: 'Значение роли' })
  @Column({ unique: true })
  value: string;
}
