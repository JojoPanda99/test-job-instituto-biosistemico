import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PersonEntity} from "./personEntity";

@Entity()
export class ProfessionEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @OneToMany(() => PersonEntity, object => object.profession)
  person: ProfessionEntity

}
