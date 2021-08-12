/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterComplaintColumnMessage1628764363535 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'complaints',
      'message',
      new TableColumn({
        name: 'message',
        type: 'varchar(1000)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'complaints',
      'message',
      new TableColumn({
        name: 'message',
        type: 'varchar',
      }),
    );
  }
}
