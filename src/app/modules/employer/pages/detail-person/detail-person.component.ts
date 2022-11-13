import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PersonService} from "../../services/person.service";
import {PersonModel} from "../../interfaces/person.interface";

@Component({
  selector: 'app-detail-person',
  templateUrl: './detail-person.component.html',
  styleUrls: ['./detail-person.component.css']
})
export class DetailPersonComponent implements OnInit {

  constructor(private route: ActivatedRoute, private personService: PersonService) {
  }

  personDetails: PersonModel = {
    id: 0,
    name: "",
    email: "",
    phone: "",
    professionId: 0,
    profession: {id: 0, name: ""}
  }
  isLoaded = false;

  ngOnInit(): void {
    this.route.params.subscribe(async params => await this.findPerson(+params['id']));
  }

  private async findPerson(personId: number) {
    this.personService.findOne(personId).subscribe({
      next:(value) => this.personDetails = value[0],
      complete: () => this.isLoaded = true
    });
  }
}
