import { Post as PostModel } from '@modules/posts/models/posts.model';
import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@ApiTags('Post')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Creating a post' })
  @ApiResponse({ status: 200 })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public async createPost(@Body() dto: CreatePostDto, @UploadedFile() image: string): Promise<PostModel> {
    return this.postService.create(dto, image);
  }
}
