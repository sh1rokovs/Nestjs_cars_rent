import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'login', description: 'Логин пользователя' })
  @IsString({ message: 'Должно быть строковым значением' })
  readonly username: string;

  @ApiProperty({
    example: 'email@example.ru',
    description: 'Почта пользователя',
  })
  @IsString({ message: 'Должно быть строковым значением' })
  readonly email: string;

  @ApiProperty({ example: '********', description: 'Пароль пользователя' })
  @IsString({ message: 'Должно быть строковым значением' })
  readonly password: string;

  @ApiProperty({
    example: '+7 999 123 23 23',
    description: 'Телефон пользователя',
  })
  @IsString({ message: 'Должно быть строковым значением' })
  readonly phone: string;
}
