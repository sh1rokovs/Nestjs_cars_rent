import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from '../../database/entities/car.entity';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Post()
  @ApiOperation({ summary: 'Добавить автомобиль' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Автомобиль не найден' })
  create(@Body() createCar: CreateCarDto) {
    return this.carsService.createCar(createCar);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все незаброинрованые автомобили' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Автомобиль не найден' })
  getAllNoRent(): Promise<Car[]> {
    return this.carsService.getAllNoRent();
  }

  @Get('/rent-cars')
  @ApiOperation({ summary: 'Получить все забронированые автомобили' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Автомобиль не найден' })
  getAllRent(): Promise<Car[]> {
    return this.carsService.getAllRent();
  }

  @Get('/rent/:id')
  @ApiOperation({ summary: 'Забронировать автомобиль' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Автомобиль не найден' })
  rentCar(@Param('id') id: number): Promise<Car> {
    return this.carsService.rentCar(id);
  }

  @Get('/unrent/:id')
  @ApiOperation({ summary: 'Снять автомобиль с брони' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Автомобиль не найден' })
  unrentCar(@Param('id') id: number): Promise<Car> {
    return this.carsService.unrentCar(id);
  }

  @Delete('/remove/:id')
  @ApiOperation({ summary: 'Удалить автомобиль' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Автомобиль не найден' })
  remove(@Param('id') id: number): Promise<void> {
    return this.carsService.removeCar(id);
  }
}
