import {JoinColumn, Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
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

    @ManyToOne(() => ProfessionEntity)
    @JoinColumn()
    profession: ProfessionEntity

}
