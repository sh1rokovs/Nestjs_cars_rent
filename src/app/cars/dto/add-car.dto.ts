import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddCarDto {
  @ApiProperty({ example: '1', description: 'Идентификатор автомобиля' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly id: number;

  @ApiProperty({ example: 'toyota', description: 'Марка автомобиля' })
  @IsString({ message: 'Должно быть стрковым значением' })
  readonly mark: number;

  @ApiProperty({ example: '1', description: 'Идентификатор пользователя' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly userId: number;
}
