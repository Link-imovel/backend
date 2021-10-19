import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class foreignkeys1634595148601 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['permissionlevel'],
        referencedColumnNames: ['id'],
        referencedTableName: 'permissions',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'publications',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'publications',
      new TableForeignKey({
        columnNames: ['homeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'homes',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'addresses',
      new TableForeignKey({
        columnNames: ['id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'homes',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'images',
      new TableForeignKey({
        columnNames: ['homeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'homes',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Tables
    const tableUser = await queryRunner.getTable('users');
    const tablePub = await queryRunner.getTable('publications');
    const tableAddress = await queryRunner.getTable('addresses');
    const tableImage = await queryRunner.getTable('images');

    // To drop
    await queryRunner.dropForeignKey(
      'users',
      tableUser.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('permissionlevel') !== -1,
      ),
    );

    await queryRunner.dropForeignKey(
      'publications',
      tablePub.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('homeId') !== -1,
      ),
    );

    await queryRunner.dropForeignKey(
      'publications',
      tablePub.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('userId') !== -1,
      ),
    );

    await queryRunner.dropForeignKey(
      'addresses',
      tableAddress.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('id') !== -1,
      ),
    );

    await queryRunner.dropForeignKey(
      'images',
      tableImage.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('homeId') !== -1,
      ),
    );
  }
}
