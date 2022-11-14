import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProfessionService} from "../../services/profession.service";
import {PersonModel} from "../../interfaces/person.interface";
import {ProfessionModel} from "../../interfaces/profession.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {PersonService} from "../../services/person.service";
import {PersonEntity} from "../../interfaces/person.entity.interface";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {

  @Input() personEdit: PersonModel = {
    email: "", id: 0, name: "", phone: "", profession: {id: 0, name: ''}, professionId: 0
  }
  formPerson = new FormGroup(
    {
      email: new FormControl(''),
      id: new FormControl(0),
      name: new FormControl(''),
      phone: new FormControl(''),
      profession: new FormControl(''),
      newJobName: new FormControl(""),
      haveToCreateJob: new FormControl(false)
    }
  );
  @Input() operation: string = "CREATE";


  professionsList: Array<ProfessionModel> = new Array<ProfessionModel>();
  personPreviews: Array<PersonModel> = [{
    email: "", id: 0, name: "", phone: "", profession: {id: 0, name: ""}, professionId: 0
  }];

  constructor(
    private activatedRoute: ActivatedRoute,
    private professionService: ProfessionService,
    private personService: PersonService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.personPreviews.push(this.personEdit)
    this.formPerson.setValue({
      id: this.personEdit.id,
      email: this.personEdit.email,
      name: this.personEdit.name,
      phone: this.personEdit.phone,
      profession: this.personEdit.professionId.toString(),
      newJobName: null,
      haveToCreateJob: this.formPerson.value.haveToCreateJob!
    })
  }

  ngOnInit(): void {
    this.personPreviews.shift();
    this.professionService.findAll().subscribe(value => this.professionsList = value);
    if (this.operation.toUpperCase() == "EDIT") {

      this.activatedRoute.params.subscribe(value => this.personService.findOne(+value['id']).subscribe(
        value => {
          const formValues = this.formPerson.value;
          const person = value[0]
          formValues.id = person.id;
          formValues.name = person.name;
          formValues.email = person.email;
          formValues.phone = person.phone;
        }
      ))
    }
  }

  onSubmit() {
    const formValues = this.formPerson.value;
    console.log(formValues)
    const personEntity: PersonEntity = {
      email: formValues.email!, name: formValues.name!, phone: formValues.phone!, professionId: 0
    }
    if (this.formPerson.value.haveToCreateJob) {
      const professionResponse = this.professionService.create(this.formPerson.value.newJobName!)
      personEntity.professionId = professionResponse.id
    } else {
      personEntity.professionId = parseInt(formValues.profession!)
    }

    if (this.operation.toUpperCase() == 'EDIT') {
      personEntity.id = this.personEdit.id;
      this.personService.edit(personEntity);
    } else {
      this.personService.create(personEntity);
    }

  }

  onChanges(): void {
    const profession = this.professionsList.find(value => value.id == parseInt(this.formPerson.value.profession!));
    const formObject = Object.assign({
        ...this.personPreviews[0], ...this.formPerson.value,
        profession: {
          id: profession ? profession!.id : '',
          name: profession ? profession!.name : ''
        }
      }
    );
    if (this.formPerson.value.haveToCreateJob) {
      formObject.profession.id = '';
      formObject.profession.name = this.formPerson.value.newJobName;
    }
    this.personPreviews.push(formObject)
    this.personPreviews.shift()
  }

}
