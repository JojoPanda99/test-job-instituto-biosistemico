import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PersonModel} from "../interfaces/person.interface";
import {PersonEntity} from "../interfaces/person.entity.interface";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpRequest: HttpClient, private router: Router) {
  }

  findAll(): PersonEntity[] {
    const persons = new Array<PersonEntity>()
    this.httpRequest.get<Array<PersonEntity>>(`/api/persons`).subscribe(value => persons.push(...value));
    return persons;
  }

  async findOne(id: number): Promise<PersonEntity> {
    return await this.httpRequest.get<PersonEntity>(`/api/persons/${id}`).toPromise()
  }

  create(person: PersonModel) {
    this.httpRequest.post(`/api/persons`, person).subscribe({complete: () => this.router.navigateByUrl('/persons')});
  }

  edit(person: PersonModel) {
    this.httpRequest.put(`/api/persons/${person.id}`, person).subscribe({complete: () => this.router.navigateByUrl('/persons')});
  }

  delete(id: number) {
    this.httpRequest.delete(`/api/persons/${id}`).subscribe({complete: () => this.router.navigateByUrl('/persons')});
  }
}
