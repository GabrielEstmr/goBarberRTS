import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User'

// @ManyToOne(() => User)
//     @JoinColumn({ name: 'provider_id' })
//     provider: User; >>>>>>>>>>o contrario em user pode ser feito se for buscar todos os agendamentos (appointments) de um certo usuário

@Entity('appointments')//Nome da tabela aqui
class Appointment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()//=@Column('string')
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    @Column()//=@Column('string')
    user_id: string;

    @ManyToOne(() => User)//é apenas um relacionamento no JavaScript
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column('time without time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Appointment;




































































// // // // import { uuid } from "uuidv4";
// // // import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// // // //@ > decoration > duas ultimas opções do tsconfig
// // // //Passando Decoration para uma classe > linha imediatamente acima
// // // //EQUIVALENTE A: export default Entity(Appointment);

// // // // // //Nao precisa mais do constructor pois ele já é criado automaticamente > pois isso fica o erro (mas está OK)
// // // //CONSTRUCTOR = componentWillMount (before component mount)

// // // @Entity('appointments')
// // // class Appointment {
// // //     @PrimaryGeneratedColumn('uuid')
// // //     id: string;

// // //     @Column()//=@Column('string')
// // //     provider: string;

// // //     @Column('time without time zone')
// // //     date: Date;
// // //     //  Para dar "new Appointment" ja com informações
// // //     // constructor(provider: string, date: Date) {


// // //     // // //Nao precisa mais do constructor pois ele já é criado automaticamente


// // //     // //Omit<Appointment, 'id'>:pega todos as variáveis que tem em Appointment e omite id
// // //     // constructor({ provider, date }: Omit<Appointment, 'id'>) {
// // //     //     this.id = uuid();
// // //     //     this.provider = provider;
// // //     //     this.date = date;
// // //     // }
// // // }

// // // export default Appointment;
