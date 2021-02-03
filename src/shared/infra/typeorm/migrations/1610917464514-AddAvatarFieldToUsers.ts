import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddAvatarFieldToUsers1610917464514 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'avatar');
    }

}



// isNullable: true, pois se já temos dados no DB tem que permitir ser nulo
// Salvamento de imagens/arquivos no db > salva apenas caminhos > imagem ficam alocadas mesmo é no servidor