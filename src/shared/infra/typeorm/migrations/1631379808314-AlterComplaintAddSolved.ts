/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterComplaintAddSolved1631379808314 implements MigrationInterface {
  name = 'AlterComplaintAddSolved1631379808314';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `complaints` ADD `solved` tinyint NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `complaints` DROP COLUMN `solved`');
  }
}
