import {Component, OnInit} from '@angular/core';
import {PersonService} from "../../services/person.service";
import {PersonModel} from "../../interfaces/person.interface";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-list-employers',
  templateUrl: './list-employers.component.html',
  styleUrls: ['./list-employers.component.css']
})
export class ListEmployersComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private personService: PersonService) {
  }

  persons: Array<PersonModel> = new Array<PersonModel>();

  ngOnInit(): void {
    this.personService.findAll().subscribe({
      next: value => this.persons = value,
    });
  }

  consola() {
    console.log(this.persons)
  }

}
