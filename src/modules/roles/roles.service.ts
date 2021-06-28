import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './models/roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  public async createRole(dto: CreateRoleDto): Promise<Role> {
    return this.roleRepository.create(dto);
  }

  public async getRoleByValue(value: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { value } });
  }
}
