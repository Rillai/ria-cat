import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BlockUserDto } from './dto/block-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('user');

    await user.$set('roles', [role.id]);
    user.roles = [role];

    return user;
  }

  public async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll({ include: { all: true } });
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  public async addRole(dto: AddRoleDto): Promise<AddRoleDto> {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('User or role is not found', HttpStatus.NOT_FOUND);
  }

  public async ban(dto: BlockUserDto): Promise<User> {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }
    user.blocked = true;
    user.blockReason = dto.blockReason;

    await user.save();

    return user;
  }
}
