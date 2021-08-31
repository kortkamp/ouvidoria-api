/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterComplaintModifyId1630445530797 implements MigrationInterface {
  name = 'AlterComplaintModifyId1630445530797';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `answers` DROP FOREIGN KEY `FK_c1752b5d261753ca1c7fa7503dd`');
    await queryRunner.query('ALTER TABLE `complaints` DROP PRIMARY KEY');
    await queryRunner.query('ALTER TABLE `complaints` DROP COLUMN `id`');
    await queryRunner.query('ALTER TABLE `complaints` ADD `id` bigint NOT NULL PRIMARY KEY AUTO_INCREMENT');
    await queryRunner.query('ALTER TABLE `complaints` AUTO_INCREMENT=100000000');
    await queryRunner.query('ALTER TABLE `answers` DROP COLUMN `complaint_id`');
    await queryRunner.query('ALTER TABLE `answers` ADD `complaint_id` bigint NOT NULL');
    await queryRunner.query('ALTER TABLE `answers` ADD CONSTRAINT `FK_c1752b5d261753ca1c7fa7503dd` FOREIGN KEY (`complaint_id`) REFERENCES `complaints`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `answers` DROP FOREIGN KEY `FK_c1752b5d261753ca1c7fa7503dd`');
    await queryRunner.query('ALTER TABLE `answers` DROP COLUMN `complaint_id`');
    await queryRunner.query('ALTER TABLE `answers` ADD `complaint_id` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `complaints` DROP COLUMN `id`');
    await queryRunner.query('ALTER TABLE `complaints` ADD `id` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `complaints` ADD PRIMARY KEY (`id`)');
    await queryRunner.query('ALTER TABLE `answers` ADD CONSTRAINT `FK_c1752b5d261753ca1c7fa7503dd` FOREIGN KEY (`complaint_id`) REFERENCES `complaints`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
  }
}
