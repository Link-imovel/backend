import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';

import { Permission } from '../entities/permissions.entity';

@Injectable()
export class SeedingMiddleware implements NestMiddleware {
  private isSeedingComplete: Promise<boolean>;

  constructor(private readonly entityManager: EntityManager) {}

  async use(req: Request, res: Response, next: () => any) {
    if (await this.isSeedingComplete) {
      return next();
    }

    this.isSeedingComplete = (async () => {
      if (
        !(await this.entityManager.findOne(Permission, {
          name: 'user',
        }))
      ) {
        const user = new Permission();
        const admin = new Permission();
        user.name = 'user';
        admin.name = 'admin';
        await this.entityManager.transaction(
          async (transactionalEntityManager) => {
            await transactionalEntityManager.save([user, admin], {});
          },
        );
      }

      return true;
    })();

    await this.isSeedingComplete;

    next();
  }
}
