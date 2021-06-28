import { FilesService } from '@common/utils/files/files.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './models/posts.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post, private fileService: FilesService) {}

  public async create(dto: CreatePostDto, image: any): Promise<Post> {
    const filename = await this.fileService.createFile(image);

    return this.postRepository.create({ ...dto, image: filename });
  }
}
