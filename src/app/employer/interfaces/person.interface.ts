export interface PersonModel {
  id: number;
  name: string;
  phone: string;
  email: string;
  professionId: number;
  profession: {
    id?: number;
    name: string;
  }
}
