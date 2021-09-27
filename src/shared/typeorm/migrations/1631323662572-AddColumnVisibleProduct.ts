import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnVisibleProduct1631323662572
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'visible',
        type: 'boolean',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'visible');
  }
}
