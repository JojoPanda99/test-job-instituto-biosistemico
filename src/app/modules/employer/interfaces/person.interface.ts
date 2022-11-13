import {ProfessionModel} from "./profession.interface";

export interface PersonModel {
  id: number;
  name: string;
  phone: string;
  email: string;
  professionId: number;
  profession: ProfessionModel;
}
