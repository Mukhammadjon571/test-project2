import { MigrationInterface, QueryRunner } from "typeorm";

export class Token1708165131326 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tokens" (
                "id" SERIAL PRIMARY KEY,
                "issuedDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "accessToken" VARCHAR(1024),
                "refreshToken" VARCHAR(1024),
                "accessTokenExpirationDate" VARCHAR,
                "refreshTokenExpirationDate" VARCHAR,
                "givenTo" INT REFERENCES users(id),
                "isActive" BOOLEAN NOT NULL DEFAULT TRUE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "tokens"
        `);
    }

}
