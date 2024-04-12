import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    AfterInsert,
    OneToMany,
} from 'typeorm';
import { Report } from 'src/reports/entities/report.entity';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(/*{ unique: true }*/)
    email: string;

    @Column({ default: true })
    active?: boolean;

    @Column({ enum: ['user', 'admin', 'manager'], default: 'user' })
    role: string;

    @Column()
    password: string;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @AfterInsert()
    logInsert() {
        console.log('user inserted with id : ' + this.id);
    }
}
