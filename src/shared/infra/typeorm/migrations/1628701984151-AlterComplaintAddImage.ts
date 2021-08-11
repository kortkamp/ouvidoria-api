/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterComplaintAddImage1628701984151 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'complaints',
      new TableColumn({
        name: 'image',
        type: 'varchar',
        default: "''",
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('complaints', 'image');
  }
}
