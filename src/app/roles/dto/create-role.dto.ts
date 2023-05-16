import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'user', description: 'Значение роли' })
  @IsString({ message: 'Должно быть строковым значением' })
  readonly value: string;

  @ApiProperty({ example: 'Пользователь', description: 'Описание роли' })
  @IsString({ message: 'Должно быть строковым значением' })
  readonly description: string;
}
