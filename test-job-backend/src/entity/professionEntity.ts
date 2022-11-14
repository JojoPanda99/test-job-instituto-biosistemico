import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ProfessionEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string

}
