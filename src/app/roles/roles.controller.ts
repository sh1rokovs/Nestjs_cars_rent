import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entity/role.entity';
import { RolesService } from './roles.service';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создать роль' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() createRole: CreateRoleDto) {
    return this.rolesService.createRole(createRole);
  }

  @ApiOperation({ summary: 'Вывести роль' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  getRole(@Param('value') value: string) {
    return this.rolesService.getRole(value);
  }

  @ApiOperation({ summary: 'Удалить роль' })
  @ApiResponse({ status: 200 })
  @Get('/:id')
  removeRole(@Param('id') id: number) {
    return this.rolesService.removeRole(id);
  }
}
