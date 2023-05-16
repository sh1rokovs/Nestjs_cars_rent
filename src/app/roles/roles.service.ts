import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entity/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createRole(createRole: CreateRoleDto): Promise<Role> {
    const role = new Role();

    role.value = createRole.value;
    role.description = createRole.description;

    return await this.roleRepository.save(role);
  }

  async getRole(value: string): Promise<Role> {
    return await this.roleRepository.findOneBy({ value: value });
  }

  async removeRole(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
