import { ObjectID, Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm';


//MongDB: nao sao as migrations que determinam o tipo de dado de cada campo  >>1

//ObjectID e ObjectIdColumn > proprios do Mongo
@Entity('notifications')
class Notification {
    @ObjectIdColumn()
    id: ObjectID;

    @Column('')
    content: string;

    @Column('uuid')
    recipient_id: string;

    @Column({ default: false })//No mongo como nao tem Migrations o Default fica no código >>> OBS1
    read: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


};


export default Notification;