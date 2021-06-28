import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../../auth/auth.module';
import { Post } from '../posts/models/posts.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { User } from './models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles, Post]), forwardRef(() => AuthModule), RolesModule],
  exports: [UsersService],
})
export class UsersModule {}
