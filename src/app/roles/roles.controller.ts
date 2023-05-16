import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  create(@Body() createRole: CreateRoleDto) {
    return this.rolesService.createRole(createRole);
  }

  @Get('/:value')
  getRole(@Param('value') value: string) {
    return this.rolesService.getRole(value);
  }

  @Get('/:id')
  removeRole(@Param('id') id: number) {
    return this.rolesService.removeRole(id);
  }
}
