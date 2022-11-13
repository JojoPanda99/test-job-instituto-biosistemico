import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PersonService} from "../../services/person.service";
import {FormControl, FormGroup} from "@angular/forms";
import {PersonModel} from "../../interfaces/person.interface";
import {ProfessionService} from "../../services/profession.service";
import {ProfessionModel} from "../../interfaces/profession.interface";

@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.css']
})
export class FormPersonComponent implements OnInit {

  formPerson = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    profession: new FormControl(''),
  })

  personPreviews: Array<PersonModel> = [{
    email: "", id: 0, name: "", phone: "", profession: {id: 0, name: ""}, professionId: 0
  }];

  professionsList: Array<ProfessionModel> = new Array<ProfessionModel>()

  constructor(private activatedRoute: ActivatedRoute, private personService: PersonService, private professionService: ProfessionService) {
  }

  ngOnInit(): void {
    this.professionService.findAll().subscribe(value => this.professionsList = value);
  }

  onSubmit() {
    console.log(this.formPerson.value)
  }

  onChanges(): void {
    this.personPreviews.push(Object.assign({...this.personPreviews[0], ...this.formPerson.value, profession: this.professionsList.find(value => value.id == parseInt(this.formPerson.value.profession!))}))
    this.personPreviews.shift()
  }

}
