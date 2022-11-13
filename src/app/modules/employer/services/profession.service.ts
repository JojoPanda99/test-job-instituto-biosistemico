import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProfessionModel} from "../interfaces/profession.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {
  private _BASE_URL = 'http://localhost:3000';
  constructor(private httpRequest: HttpClient) { }

  findAll(){
    return this.httpRequest.get<Array<ProfessionModel>>(`${this._BASE_URL}/professions`)
  }
}
