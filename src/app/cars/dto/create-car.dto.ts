import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ example: 'toyota', description: 'Модель машины' })
  @IsString({ message: 'Должна быть строкой' })
  readonly model: string;

  @ApiProperty({ example: 'mark', description: 'Марка машины' })
  @IsString({ message: 'Должна быть строкой' })
  readonly mark: string;

  @ApiProperty({ example: '10000', description: 'Цена аренды' })
  @IsNumber({}, { message: 'Должна быть строкой' })
  readonly price: number;

  @ApiProperty({
    example: '123124.jpg',
    description: 'Название фото автомобиля',
  })
  @IsString({ message: 'Должна быть строкой' })
  readonly img: string;

  @ApiProperty({ example: 'false', description: 'Статус аренды' })
  @IsBoolean({ message: 'Должна быть строкой' })
  readonly rent: boolean;
}
