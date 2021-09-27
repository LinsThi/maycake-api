import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnsMethodPayAndTrocoProduct1631476590784
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('sales', [
      new TableColumn({
        name: 'methodpay',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'troco',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('sales', [
      new TableColumn({
        name: 'methodpay',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'troco',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }
}
