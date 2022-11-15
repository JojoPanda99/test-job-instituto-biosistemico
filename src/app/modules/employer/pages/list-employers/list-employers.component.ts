import {Component, OnInit} from '@angular/core';
import {PersonService} from "../../services/person.service";
import {ActivatedRoute} from "@angular/router";
import {PersonEntity} from "../../interfaces/person.entity.interface";


@Component({
  selector: 'app-list-employers',
  templateUrl: './list-employers.component.html',
  styleUrls: ['./list-employers.component.css']
})
export class ListEmployersComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private personService: PersonService) {
  }

  persons: Array<PersonEntity> = new Array<PersonEntity>();

  async ngOnInit(): Promise<void> {
    this.persons = await this.personService.findAll()
  }

}
