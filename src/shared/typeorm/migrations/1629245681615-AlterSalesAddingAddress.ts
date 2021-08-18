import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterSalesAddingAddress1629245681615
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sales',
      new TableColumn({
        name: 'address_id_user',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'sales',
      new TableForeignKey({
        name: 'FKAdressUserSale',
        referencedTableName: 'address',
        referencedColumnNames: ['id'],
        columnNames: ['address_id_user'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('sales', 'address_user');
  }
}
