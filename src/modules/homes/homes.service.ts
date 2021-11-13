import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Home } from '../../entities/home.entity';
import { AddressesService } from '../addresses/addresses.service';
import { ImagesService } from '../images/images.service';
import CreateHomeDTO from './dto/create.dto';
import UpdateHomeDTO from './dto/update.dto';
import { IHomesService } from './interfaces/homes.service';

@Injectable()
export class HomesService implements IHomesService {
  constructor(
    @InjectRepository(Home)
    private homesRepository: Repository<Home>,
    private addressesService: AddressesService,
    private imagesService: ImagesService,
  ) {}

  async create(data: CreateHomeDTO): Promise<Home> {
    let home = new Home();
    home = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const { id } = await this.homesRepository.save(home);
    await this.addressesService.create({ id, ...data.address });
    if (data.images) {
      Array.isArray(data.images)
        ? await Promise.all(
            data.images.map(
              async (images) => await this.imagesService.create(id, images),
            ),
          )
        : await this.imagesService.create(id, data.images);
    }
    return await this.homesRepository.findOne(id);
  }

  async update(id: string, data: UpdateHomeDTO): Promise<Home> {
    const home = await this.homesRepository.findOne(id);
    if (home) {
      if (data.address) {
        await this.addressesService.update(home.id, data.address);
      }

      if (data.images) {
        Array.isArray(data.images)
          ? await Promise.all(
              data.images.map(
                async (images) =>
                  await this.imagesService.update(images.id, images.image),
              ),
            )
          : await this.imagesService.update(data.images.id, data.images.image);
      }
      await this.homesRepository.update(home, data);
      return this.homesRepository.findOne(id);
    }

    throw new HttpException('home not found', HttpStatus.NOT_FOUND);
  }

  async find(id: string): Promise<Home> {
    return this.homesRepository.findOne(id);
  }
}
