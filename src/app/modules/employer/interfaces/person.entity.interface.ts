import {ProfessionModel} from "./profession.interface";

export interface PersonEntity {
  id: number;
  name: string;
  email: string;
  phone: string;
  profession: ProfessionModel;
}
