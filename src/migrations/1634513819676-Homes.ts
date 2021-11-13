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
            isNullable: false,
          },
          {
            name: 'totalArea',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'room',
            type: 'int',
          },
          {
            name: 'bedroom',
            type: 'int',
          },
          {
            name: 'bathroom',
            type: 'int',
          },
          {
            name: 'kitchen',
            type: 'int',
          },
          {
            name: 'garage',
            type: 'int',
          },
          {
            name: 'serviceArea',
            type: 'int',
          },
          {
            name: 'builtAt',
            type: 'timestamptz',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
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
