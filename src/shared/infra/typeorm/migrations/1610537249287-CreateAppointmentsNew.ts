import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAppointmentsNew1610537249287 implements MigrationInterface {

    //O que fazer de novo
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'provider_id',
                        type: 'uuid',
                        isNullable: true,//se deleta prestador de serviços nao deleta historico de solicitacoes
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        );

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }


    //onDelete:'SET NULL'//''RESTRICT e CASCADE (deleta em cascata)

    //O que desfazer
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }

}
