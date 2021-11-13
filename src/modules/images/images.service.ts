import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/entities/image.entity';
import { Repository } from 'typeorm';
import { CreateImage } from './interfaces/images';
import { IImageService } from './interfaces/images.service';

@Injectable()
export class ImagesService implements IImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async getImage(imageId: string): Promise<Image> {
    return await this.imageRepository.findOne(imageId);
  }

  async getImages(homeId: string): Promise<Image[]> {
    return await this.imageRepository.find({ homeId });
  }

  async create(homeId: string, data: CreateImage): Promise<Image> {
    const image = new Image();
    image.homeId = homeId;
    image.image = data.image;
    const id = await this.imageRepository.save(image);
    return await this.imageRepository.findOne(id);
  }

  async update(id: string, file: Buffer): Promise<Image> {
    const image = await this.imageRepository.findOne(id);
    if (image) {
      await this.imageRepository.update(id, { image: file });
      return await this.imageRepository.findOne(id);
    }

    throw new HttpException(
      'Image could not be updated or found.',
      HttpStatus.NOT_FOUND,
    );
  }

  async delete(imageId: string): Promise<void> {
    await this.imageRepository.delete(imageId);
  }

  async deleteAll(homeId: string): Promise<void> {
    await this.imageRepository.delete({ homeId });
  }
}
