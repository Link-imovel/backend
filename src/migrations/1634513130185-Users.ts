import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1634513130185 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'firstName',
            type: 'varchar',
            isNullable: false,
            length: '50',
          },
          {
            name: 'lastName',
            type: 'varchar',
            isNullable: false,
            length: '255',
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            length: '255',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'registry',
            type: 'varchar',
            length: '25',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'mobile',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'creci',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'permissionLevel',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'birthday',
            type: 'timestamp',
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
    await queryRunner.dropTable('users');
  }
}
