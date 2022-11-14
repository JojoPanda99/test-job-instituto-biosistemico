import {JoinColumn, Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm"
import {ProfessionEntity} from "./professionEntity";
@Entity()
export class PersonEntity{
    @PrimaryGeneratedColumn()
    id?: number
    @Column()
    name: string

    @Column()
    email: string

    @Column()
    phone: string

    @OneToOne(() => ProfessionEntity)
    @JoinColumn()
    profession: ProfessionEntity

}
