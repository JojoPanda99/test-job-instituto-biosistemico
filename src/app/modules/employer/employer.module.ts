import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListEmployersComponent} from "./pages/list-employers/list-employers.component";
import {HttpClientModule} from "@angular/common/http";
import {DetailPersonComponent} from './pages/detail-person/detail-person.component';
import {RouterLinkWithHref} from "@angular/router";
import {EmployerRoutingModule} from "./employer-routing.module";
import {PersonService} from "./services/person.service";
import {CardPersonComponent} from "./components/card-person/card-person.component";
import {FormPersonComponent} from './pages/form-person/form-person.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ProfessionService} from "./services/profession.service";
import {FormComponent} from "./components/form/form.component";


@NgModule({
  declarations: [
    ListEmployersComponent,
    DetailPersonComponent,
    CardPersonComponent,
    FormPersonComponent,
    FormComponent,
  ],
  providers: [PersonService, ProfessionService],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLinkWithHref,
    EmployerRoutingModule,
    ReactiveFormsModule,
  ]
})
export class EmployerModule {
}
