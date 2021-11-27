import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Address1634514823330 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS postgis');
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'street',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'street2',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'zip',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'ibge',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'location',
            type: 'geography',
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
    await queryRunner.query('CREATE INDEX ON addresses USING gist(location)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('address');
  }
}
