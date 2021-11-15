import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publication } from '../../entities/publication.entity';
import { HomesService } from '../homes/homes.service';
import CreatePublicationDTO from './dto/create.dto';
import UpdatePublicationDTO from './dto/update.dto';
import { IPublicationsService } from './interfaces/publications.service';

@Injectable()
export class PublicationsService implements IPublicationsService {
  constructor(
    @InjectRepository(Publication)
    private publicationsRepository: Repository<Publication>,
    private homesService: HomesService,
  ) {}

  async findAll(page?: number): Promise<Publication[]> {
    const take = page ? page * 10 : 10;
    const skip = page ? page - 1 * take : 0;

    return await this.publicationsRepository.find({
      where: { rented: false },
      take,
      skip,
    });
  }

  async find(id: string): Promise<Publication> {
    return await this.publicationsRepository.findOne(id, {
      where: {
        rented: false,
      },
    });
  }

  async create(
    userId: string,
    data: CreatePublicationDTO,
  ): Promise<Publication> {
    const home = await this.homesService.create(data.home);
    const pub = new Publication();
    pub.phone = data.phone;
    pub.virtualTour = data.virtualTour;
    pub.views = 0;
    pub.reserved = false;
    pub.rented = false;
    pub.homeId = home.id;
    pub.userId = userId;
    const { id } = await this.publicationsRepository.save(pub);
    return await this.publicationsRepository.findOne(id);
  }

  async update(
    id: string,
    data: UpdatePublicationDTO,
    user: any,
  ): Promise<Publication> {
    const pub = await this.publicationsRepository.findOne(id);
    if (!pub) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if (pub.userId !== user.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }

    await this.homesService.update(pub.homeId, data.home);
    pub.phone = data.phone;
    pub.virtualTour = data.virtualTour;
    pub.views = data.views;
    pub.reserved = data.reserved;
    await this.publicationsRepository.update(id, pub);
    return await this.publicationsRepository.findOne(id);
  }

  async deactivate(id: string, user: any): Promise<void> {
    const pub = await this.publicationsRepository.findOne(id);

    if (!pub) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if (pub.userId !== user.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }

    await this.publicationsRepository.update(id, {
      rented: true,
    });
  }

  async activate(id: string, user: any): Promise<Publication> {
    const pub = await this.publicationsRepository.findOne(id);

    if (!pub) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if (pub.userId !== user.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }

    await this.publicationsRepository.update(id, {
      rented: false,
    });
    return await this.publicationsRepository.findOne(id);
  }
}
