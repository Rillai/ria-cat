import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RolesGuard } from '../../auth/guards/roles-guard';
import { Roles } from '../../auth/roles-auth.decorator';
import { AddRoleDto } from './dto/add-role.dto';
import { BlockUserDto } from './dto/block-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('users')
@Roles('ADMIN')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Creating a user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  public async create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  public async getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Assign a role' })
  @ApiResponse({ status: 200 })
  @Post('/role')
  public async addRole(@Body() dto: AddRoleDto): Promise<AddRoleDto> {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'Block user' })
  @ApiResponse({ status: 200 })
  @Get('/ban')
  public async ban(@Body() dto: BlockUserDto): Promise<User> {
    return this.usersService.ban(dto);
  }
}
