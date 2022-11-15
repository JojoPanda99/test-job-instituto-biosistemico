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

  formPerson = new FormGroup(
    {
      email: new FormControl(''),
      id: new FormControl(null),
      name: new FormControl(''),
      phone: new FormControl(''),
      profession: new FormControl(''),
      newJobName: new FormControl(""),
      haveToCreateJob: new FormControl(false)
    }
  );
  @Input() operation: string = "CREATE";


  professionsList: Array<ProfessionModel> = new Array<ProfessionModel>();
  personPreviews: Array<PersonEntity> = [];
  isLoaded = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private professionService: ProfessionService,
    private personService: PersonService
  ) {
    this.professionsList = this.professionService.findAll();
  }

  ngOnInit(): void {
    if (this.operation.toUpperCase() == "EDIT") {
      this.activatedRoute.params.subscribe(async value => {
        await this.setForm(+value['id'])
      })
    }
  }

  private async setForm(id: number){
    const formValues = this.formPerson.value;
    const person = await this.personService.findOne(id);
    formValues.id = person.id;
    formValues.name = person.name;
    this.formPerson.setValue({
      email: person.email,
      haveToCreateJob: false,
      id: person.id,
      name: person.name,
      newJobName: "",
      phone: person.phone,
      profession: person.profession.id.toString()
    })
    this.personPreviews.shift();
    this.personPreviews.push(person)
  }

  ngOnChanges(changes: SimpleChanges): void {
    const personPreview: PersonEntity = {
      id: this.formPerson.value.id,
      email: this.formPerson.value.email,
      name: this.formPerson.value.name,
      phone: this.formPerson.value.phone,
      profession: this.professionsList[this.formPerson.value.profession],
    }
    this.personPreviews.push(personPreview)
    this.formPerson.setValue({
      id: this.formPerson.value.id,
      email: this.formPerson.value.email,
      name: this.formPerson.value.name,
      phone: this.formPerson.value.phone,
      profession: this.formPerson.value.profession,
      newJobName: null,
      haveToCreateJob: this.formPerson.value.haveToCreateJob!
    })
  }

  async onSubmit() {
    const formValues = this.formPerson.value;
    const personEntity: PersonModel = {
      id: 0,
      email: formValues.email!, name: formValues.name!, phone: formValues.phone!, professionId: 0
    }
    if (this.formPerson.value.haveToCreateJob) {
      const professionResponse = await this.professionService.create(this.formPerson.value.newJobName!)
      personEntity.professionId = professionResponse.id
    } else {
      personEntity.professionId = parseInt(formValues.profession)
    }

    if (this.operation.toUpperCase() == 'EDIT') {
      personEntity.id = this.formPerson.value.id;
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
