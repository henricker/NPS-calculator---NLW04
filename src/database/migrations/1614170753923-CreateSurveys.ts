import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveys1614170753923 implements MigrationInterface {

    private table = new Table({
        name: "surveys",
        columns: [
            {
                name: "id",
                type: "uuid",
                isPrimary: true
            },
            {
                name: "title",
                type: "varchar",
            },
            {
                name: "description",
                type: "varchar",
            },
            {
                name: "created_at",
                type: "timestamp",
                default: "now()"
            }
        ]
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable(this.table);
    }

}
