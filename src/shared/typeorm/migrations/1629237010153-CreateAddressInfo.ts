import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAddressInfo1629237010153 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'road',
            type: 'varchar',
          },
          {
            name: 'number',
            type: 'integer',
          },
          {
            name: 'complement',
            type: 'varchar',
          },
          {
            name: 'cep',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            name: 'FKUserAdress',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('address');
  }
}
