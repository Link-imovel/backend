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
            name: 'phone',
            type: 'varchar',
            length: '11',
            isNullable: false,
          },
          {
            name: 'reserved',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'views',
            type: 'int',
          },
          {
            name: 'virtualTour',
            type: 'varchar',
          },
          {
            name: 'rented',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updateAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('publications');
  }
}
