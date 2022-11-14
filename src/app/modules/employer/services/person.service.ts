import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PersonModel} from "../interfaces/person.interface";
import {PersonEntity} from "../interfaces/person.entity.interface";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  readonly _BASE_URL = "http://localhost:3000";

  constructor(private httpRequest: HttpClient, private router: Router) {
  }

  findAll() {
    return this.httpRequest.get<Array<PersonModel>>(`${this._BASE_URL}/persons?_expand=profession`)
  }

  findOne(id: number) {
    return this.httpRequest.get<Array<PersonModel>>(`${this._BASE_URL}/persons?id=${id}&_expand=profession`);
  }

  create(person: PersonEntity) {
    this.httpRequest.post(`${this._BASE_URL}/persons`, person).subscribe({complete: () => this.router.navigateByUrl('/persons')});
  }

  edit(person: PersonEntity) {
    console.log(person)
    this.httpRequest.put(`${this._BASE_URL}/persons/${person.id}`, person).subscribe({complete: () => this.router.navigateByUrl('/persons')});
  }

  delete(id: number) {
    this.httpRequest.delete(`${this._BASE_URL}/persons/${id}`).subscribe({complete: () => this.router.navigateByUrl('/persons')});
  }
}
