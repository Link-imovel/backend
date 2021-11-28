import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Permission } from 'src/entities/permissions.entity';
import { Publication } from '../../entities/publication.entity';
import { Image } from '../../entities/image.entity';
import { HomesService } from '../homes/homes.service';
import CreatePublicationDTO from './dto/create.dto';
import UpdatePublicationDTO from './dto/update.dto';
import { IPublicationsService } from './interfaces/publications.service';

@Injectable()
export class PublicationsService implements IPublicationsService {
  constructor(
    @InjectRepository(Publication)
    private readonly publicationsRepository: Repository<Publication>,
    private readonly homesService: HomesService,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async findAll(
    page?: number,
    searchText?: string,
    state?: string,
    zip?: string,
    garage?: string,
    bedroom?: string,
    bathroom?: string,
    kitchen?: string,
    value?: string,
    latitude?: string,
    longitude?: string,
  ): Promise<Publication[]> {
    const take = page ? page * 10 : 10;
    const skip = page > 1 ? page - 1 * take : undefined;
    const commonCondition = { rented: false };
    const conditions = {
      state,
      zip,
      garage,
      bedroom,
      bathroom,
      kitchen,
      value,
    };

    Object.keys(conditions).forEach(
      (key) => conditions[key] === undefined && delete conditions[key],
    );
    const hasConditions = !!Object.keys(conditions).length;

    const qb = this.publicationsRepository
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.home', 'h')
      .innerJoinAndSelect('h.images', 'i')
      .innerJoinAndSelect('h.address', 'a');

    Object.keys(conditions).map((key, i) => {
      if (i === 0) {
        if (key.match(/(state|zip)/g))
          qb.where(`a.${key} = :${key}`, { [key]: conditions[key] });
        if (key.match(/(garage|bedroom|bathroom|kitchen|value)/g))
          qb.where(`h.${key} = :${key}`, { [key]: conditions[key] });
      }

      if (i > 0) {
        if (key.match(/(state|zip)/g))
          qb.andWhere(`a.${key} = :${key}`, { [key]: conditions[key] });
        if (key.match(/(garage|bedroom|bathroom|kitchen|value)/g))
          qb.andWhere(`h.${key} = :${key}`, { [key]: conditions[key] });
      }
    });

    if (hasConditions && latitude && longitude) {
      console.log(1);
      return await qb
        .andWhere(
          `ST_DWithin(a.location, ST_MakePoint(:latitude, :longitude)::geography, 50000)`,
          { latitude, longitude },
        )
        .limit(take)
        .offset(skip)
        .getMany();
    }

    if (hasConditions && !(latitude && longitude)) {
      return await qb.limit(take).offset(skip).getMany();
    }

    if (searchText) {
      return await this.publicationsRepository.find({
        relations: ['home', 'home.address'],
        where: [
          { title: Like(searchText + '%'), ...commonCondition },
          {
            home: {
              address: {
                street: Like(searchText + '%'),
                ...commonCondition,
              },
            },
          },
          {
            home: {
              address: {
                zip: Like(searchText + '%'),
                ...commonCondition,
              },
            },
          },
          {
            home: {
              address: {
                state: Like(searchText + '%'),
                ...commonCondition,
              },
            },
          },
          {
            home: {
              address: {
                city: Like(searchText + '%'),
                ...commonCondition,
              },
            },
          },
        ],
        take,
        skip,
      });
    }

    if (latitude && longitude) {
      return await qb
        .where(
          `ST_DWithin(a.location, ST_MakePoint(:latitude, :longitude)::geography, 50000)`,
          { latitude, longitude },
        )
        .getMany();
    }

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
    pub.title = data.title;
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
    const permission = await this.permissionRepository.findOne({
      name: 'admin',
    });

    if (!pub) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if (pub.userId !== user.id && user.permissionLevel !== permission.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }

    await this.homesService.update(pub.homeId, data.home);
    const newData = { ...pub, ...data };

    delete newData.home;
    await this.publicationsRepository.update(id, newData as any);
    return await this.publicationsRepository.findOne(id);
  }

  async deactivate(id: string, user: any): Promise<void> {
    const pub = await this.publicationsRepository.findOne(id);
    const permission = await this.permissionRepository.findOne({
      name: 'admin',
    });

    if (!pub) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if (pub.userId !== user.id && user.permissionLevel !== permission.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }

    await this.publicationsRepository.update(id, {
      rented: true,
    });
  }

  async activate(id: string, user: any): Promise<Publication> {
    const pub = await this.publicationsRepository.findOne(id);
    const permission = await this.permissionRepository.findOne({
      name: 'admin',
    });

    if (!pub) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if (pub.userId !== user.id && user.permissionLevel !== permission.id) {
      throw new HttpException('Not allowed', HttpStatus.UNAUTHORIZED);
    }

    await this.publicationsRepository.update(id, {
      rented: false,
    });
    return await this.publicationsRepository.findOne(id);
  }
}
