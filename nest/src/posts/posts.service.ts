import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postModel: typeof Post,
    private fileServise: FilesService,
  ) {}

  async create(createPostDto: CreatePostDto, image: any) {
    try {
      const fileName = await this.fileServise.createFile(image);
      const post = await this.postModel.create({
        ...createPostDto,
        image: fileName,
      });
      return post;
    } catch (error) {
      throw new Error('Не удалось создать пост');
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      const posts = await this.postModel.findAll({ include: { all: true } });
      if (!posts) {
        throw new HttpException('Нету постов', HttpStatus.NOT_FOUND);
      }
      return posts;
    } catch (error) {
      throw new HttpException(
        'Не удалось получить посты',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
