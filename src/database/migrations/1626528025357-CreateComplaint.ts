/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import {
  MigrationInterface, QueryRunner, Table,
} from 'typeorm';

export class CreateComplaint1626528025357 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'complaints',
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
            name: 'district_id',
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
            name: 'FKUserSenderComplaints',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_sender'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKDistrictComplaints',
            referencedTableName: 'districts',
            referencedColumnNames: ['id'],
            columnNames: ['district_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('complaints');
  }
}
