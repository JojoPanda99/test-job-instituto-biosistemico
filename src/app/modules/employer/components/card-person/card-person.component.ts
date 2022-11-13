import {Component, Input} from '@angular/core';
import {PersonModel} from "../../interfaces/person.interface";

@Component({
  selector: 'app-card-person',
  templateUrl: './card-person.component.html',
  styleUrls: ['./card-person.component.css']
})
export class CardPersonComponent{

  constructor() {
  }
  @Input() person: PersonModel = {
    email: "", id: 0, name: "", phone: "", profession: {id: 0, name: ""}, professionId: 0
  }
  @Input('operation') operation: string = "LIST"

}
