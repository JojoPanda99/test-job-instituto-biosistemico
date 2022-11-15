import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PersonService} from "../../services/person.service";
import {PersonEntity} from "../../interfaces/person.entity.interface";

@Component({
  selector: 'app-detail-person',
  templateUrl: './detail-person.component.html',
  styleUrls: ['./detail-person.component.css']
})
export class DetailPersonComponent implements OnInit {

  constructor(private route: ActivatedRoute, private personService: PersonService) {
  }

  personDetails: PersonEntity = {
    id: 0,
    name: "",
    email: "",
    phone: "",
    profession: {
      id:0,
      name:""
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.findPerson(+params['id']));
  }

  private async findPerson(personId: number) {
    this.personDetails = await this.personService.findOne(personId)
  }
}
