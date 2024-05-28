import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1716880111304 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `workspaces` RENAME COLUMN `urk` TO `url`',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `workspaces` RENAME COLUMN `url` TO `urk`',
    );
  }
}
