import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1614092085068 implements MigrationInterface {
    private table = new Table({
			name: "users",
			columns: [
				{
					name: "id",
					type: "uuid",
					isPrimary: true
				},
				{
					name: "name",
					type: "varchar",
				},
				{
					name: "email",
					type: "varchar"
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
