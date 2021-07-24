import { TableColumn, MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnConfirmPayInSaleTable1627149336047
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sales',
      new TableColumn({
        name: 'confirmPay',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('sales', 'confirmPay');
  }
}
