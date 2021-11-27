import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Permission } from 'src/entities/permissions.entity';
import { Publication } from '../../entities/publication.entity';
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
      return await this.publicationsRepository.query(
        `
        SELECT
          *
        FROM
          publications as p
          JOIN homes as h ON (p.homeId = h.id)
          JOIN addresses as a ON (a.id = h.id)
          JOIN images as i ON (i.homeId = h.id)
        WHERE
          ST_DWithin(a.location, ST_MakePoint($1, $2)::geography, 50000)
        ORDER BY
          a.location <-> ST_MakePoint($1, $2)::geography;
        `,
        [latitude, longitude],
      );
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
