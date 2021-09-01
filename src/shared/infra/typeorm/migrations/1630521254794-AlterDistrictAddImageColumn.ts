/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterDistrictAddImageColumn1630521254794 implements MigrationInterface {
  name = 'AlterDistrictAddImageColumn1630521254794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `districts` ADD `image` varchar(255) NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `districts` DROP COLUMN `image`');
  }
}
