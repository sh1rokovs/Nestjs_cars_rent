import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../../database/entities/user.entity';
import { UsersService } from './users.service';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RoleGuard } from 'src/guards/roles.guards';
import { AddRoleDto } from './dto/add-role.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получить конкретного пользователя' })
  @ApiResponse({ status: 200 })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.usersService.getOneUser(id);
  }

  @ApiOperation({ summary: 'Выдать роль' })
  @ApiResponse({ status: 200 })
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 200 })
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get(':id')
  removeUser(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
