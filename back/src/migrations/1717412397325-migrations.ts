import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1717412397325 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users ADD COLUMN refreshtoken TEXT NULL AFTER password;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshtoken"`);
  }
}
