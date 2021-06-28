import { FilesModule } from '@common/utils/files/files.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from '../users/models/user.model';
import { Post } from './models/posts.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [SequelizeModule.forFeature([User, Post]), FilesModule],
})
export class PostsModule {}
