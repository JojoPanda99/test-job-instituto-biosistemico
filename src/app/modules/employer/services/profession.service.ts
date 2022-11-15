import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProfessionModel} from "../interfaces/profession.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {

  constructor(private httpRequest: HttpClient) {
  }

  findAll() {
    const professionsList: Array<ProfessionModel> = []
    this.httpRequest.get<Array<ProfessionModel>>(`api/professions`).subscribe(value => professionsList.push(...value))
    return professionsList
  }

  async create(professionName: string): Promise<ProfessionModel> {
    return await this.httpRequest.post<ProfessionModel>(`/api/professions`, {name: professionName}).toPromise();
  }
}
