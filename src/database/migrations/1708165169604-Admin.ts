import { MigrationInterface, QueryRunner } from "typeorm";

export class Admin1708165169604 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "admins" (
                "id" SERIAL PRIMARY KEY,
                "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "createdBy" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                "updatedAt" TIMESTAMP,
                "updatedBy" INT REFERENCES users(id) ON DELETE CASCADE,
                "adminId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                "isActive" BOOLEAN NOT NULL DEFAULT TRUE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE admins
        `);
    }

}
