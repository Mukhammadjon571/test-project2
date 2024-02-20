import { MigrationInterface, QueryRunner } from "typeorm";

export class Articles1708165190920 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "acticles" (
                "id" SERIAL PRIMARY KEY,
                "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "createdBy" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                "updatedAt" TIMESTAMP,
                "updatedBy" INT REFERENCES users(id) ON DELETE CASCADE,
                "userId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                "name" VARCHAR(255),
                "description" TEXT,
                "postDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
