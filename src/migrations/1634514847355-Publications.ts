import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Publications1634514847355 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'publications',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'homeId',
            type: 'uuid',
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'reserved',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'views',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'virtualTour',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'rented',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('publications');
  }
}
