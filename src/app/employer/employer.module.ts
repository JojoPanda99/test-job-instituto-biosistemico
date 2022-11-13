import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListEmployersComponent} from "./list-employers/list-employers.component";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    ListEmployersComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class EmployerModule { }
