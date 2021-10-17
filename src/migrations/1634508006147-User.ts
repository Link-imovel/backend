import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1634508006147 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
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
          },
          {
            name: 'firstName',
            type: 'varchar',
          },
          {
            name: 'firstName',
            type: 'varchar',
          },
          {
            name: 'firstName',
            type: 'varchar',
          },
          {
            name: 'firstName',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
