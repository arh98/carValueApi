import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(/*{ unique: true }*/)
    email: string;

    // @Column()
    // name?: string;

    // @Column({ default: true })
    // active?: boolean;

    // @Column({ enum: ['user', 'admin', 'manager'], default: 'user' })
    // role: string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log('user inserted with id : ' + this.id);
    }
}
