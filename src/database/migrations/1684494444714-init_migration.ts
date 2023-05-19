import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1684494444714 implements MigrationInterface {
    name = 'InitMigration1684494444714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cars" ("id" SERIAL NOT NULL, "mark" character varying NOT NULL, "model" character varying NOT NULL, "price" integer NOT NULL, "rent" boolean NOT NULL, "img" character varying NOT NULL, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "description" character varying, "value" character varying NOT NULL, CONSTRAINT "UQ_bb7d685810f5cba57e9ff6756fb" UNIQUE ("value"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_roles_roles" ("usersId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_6c1a055682c229f5a865f2080c1" PRIMARY KEY ("usersId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_df951a64f09865171d2d7a502b" ON "users_roles_roles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b2f0366aa9349789527e0c36d9" ON "users_roles_roles" ("rolesId") `);
        await queryRunner.query(`CREATE TABLE "users_cars_cars" ("usersId" integer NOT NULL, "carsId" integer NOT NULL, CONSTRAINT "PK_857d7649d9dd8bf099ffdeff436" PRIMARY KEY ("usersId", "carsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_40ca7b392774e3eebd32c7f377" ON "users_cars_cars" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_29240beadd8a2bf2a745bc2759" ON "users_cars_cars" ("carsId") `);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_df951a64f09865171d2d7a502b1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_b2f0366aa9349789527e0c36d97" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_cars_cars" ADD CONSTRAINT "FK_40ca7b392774e3eebd32c7f3774" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_cars_cars" ADD CONSTRAINT "FK_29240beadd8a2bf2a745bc27593" FOREIGN KEY ("carsId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_cars_cars" DROP CONSTRAINT "FK_29240beadd8a2bf2a745bc27593"`);
        await queryRunner.query(`ALTER TABLE "users_cars_cars" DROP CONSTRAINT "FK_40ca7b392774e3eebd32c7f3774"`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_b2f0366aa9349789527e0c36d97"`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_df951a64f09865171d2d7a502b1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_29240beadd8a2bf2a745bc2759"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_40ca7b392774e3eebd32c7f377"`);
        await queryRunner.query(`DROP TABLE "users_cars_cars"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b2f0366aa9349789527e0c36d9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df951a64f09865171d2d7a502b"`);
        await queryRunner.query(`DROP TABLE "users_roles_roles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "cars"`);
    }

}
