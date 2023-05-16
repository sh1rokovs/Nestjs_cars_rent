import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 'user', description: 'Значение роли' })
  @IsString({ message: 'Должно быть строковым значением' })
  readonly value: string;

  @ApiProperty({ example: 'user', description: 'Значение роли' })
  @IsNumber({}, { message: 'Должноб ыть числом' })
  readonly userId: number;
}
