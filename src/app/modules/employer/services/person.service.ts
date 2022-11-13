import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PersonModel} from "../interfaces/person.interface";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  readonly BASE_URL = "http://localhost:3000";

  constructor(private httpRequest: HttpClient) {
  }

  findAll() {
    return this.httpRequest.get<Array<PersonModel>>(`${this.BASE_URL}/persons?_expand=profession`)
  }

  findOne(id: number) {
    return this.httpRequest.get<Array<PersonModel>>(`${this.BASE_URL}/persons?id=${id}&_expand=profession`);
  }
}
