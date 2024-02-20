import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1708148179944 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE  "users" (
                "id" SERIAL PRIMARY KEY,
                "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP,
                "username" VARCHAR(32) NOT NULL,
                "password" VARCHAR(256) NOT NULL,
                "email" VARCHAR(320) NOT NULL,
                "isActive" BOOLEAN NOT NULL DEFAULT TRUE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "users"
        `);
    }
}
