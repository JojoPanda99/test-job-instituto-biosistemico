import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PersonService} from "../../services/person.service";
import {PersonEntity} from "../../interfaces/person.entity.interface";

@Component({
  selector: 'app-card-person',
  templateUrl: './card-person.component.html',
  styleUrls: ['./card-person.component.css']
})
export class CardPersonComponent implements OnChanges{

  constructor(private personService: PersonService) {
  }

  @Input() personEntity?: PersonEntity = {
    email: "", id: 0, name: "", phone: "", profession: {id:0, name:''}
  }
  @Input('operation') operation: string = "LIST"

  onDelete(id: number) {
    this.personService.delete(id);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
