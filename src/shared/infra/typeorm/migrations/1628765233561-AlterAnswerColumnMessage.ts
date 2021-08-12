/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterAnswerColumnMessage1628765233561 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'answers',
      'message',
      new TableColumn({
        name: 'message',
        type: 'varchar(1000)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'answers',
      'message',
      new TableColumn({
        name: 'message',
        type: 'varchar',
      }),
    );
  }
}
