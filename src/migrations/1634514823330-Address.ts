import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Address1634514823330 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
          },
          {
            name: 'number',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'neighbourhood',
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
            length: '8',
            isNullable: false,
          },
          {
            name: 'ibge',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('address');
  }
}
