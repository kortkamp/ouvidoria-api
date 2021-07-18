/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAnswer1626612648695 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'answers',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,

          },
          {
            name: 'user_sender',
            type: 'varchar(36)',
          },
          {
            name: 'complaint_id',
            type: 'varchar(36)',
          },
          {
            name: 'message',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKUserSenderAnswers',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_sender'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKComplaintsAnswers',
            referencedTableName: 'complaints',
            referencedColumnNames: ['id'],
            columnNames: ['complaint_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('answers');
  }
}
