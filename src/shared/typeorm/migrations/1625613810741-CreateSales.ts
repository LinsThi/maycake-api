import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSales1625613810741 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sales',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'id_user_buying',
            type: 'uuid',
          },
          {
            name: 'id_product_sold',
            type: 'uuid',
          },
          {
            name: 'value',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKUserRelatedPurchase',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['id_user_buying'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKProductRelatedPurchase',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['id_product_sold'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sales');
  }
}
