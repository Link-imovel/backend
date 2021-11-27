import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Homes1634513819676 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'homes',
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
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'ref',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'totalArea',
            type: 'string',
            isNullable: true,
          },
          {
            name: 'value',
            type: 'string',
            isNullable: false,
          },
          {
            name: 'room',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'bedroom',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'bathroom',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'kitchen',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'garage',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'serviceArea',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'buildAt',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
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
    await queryRunner.dropTable('homes');
  }
}
