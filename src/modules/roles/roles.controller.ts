import { Role } from '@modules/roles/models/roles.model';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RolesGuard } from '../../auth/guards/roles-guard';
import { Roles } from '../../auth/roles-auth.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@ApiTags('Role')
@Controller('roles')
@Roles('ADMIN')
@UseGuards(RolesGuard)
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Creating a role' })
  @ApiResponse({ status: 200 })
  @Post()
  public async create(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(dto);
  }

  @ApiOperation({ summary: 'Getting a role' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get('/:value')
  public async getByValue(@Param('value') value: string): Promise<Role> {
    return this.roleService.getRoleByValue(value);
  }
}
