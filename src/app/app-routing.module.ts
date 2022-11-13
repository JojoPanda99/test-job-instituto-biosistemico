import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListEmployersComponent} from "./employer/list-employers/list-employers.component";

const routes: Routes = [
  { path: 'list-employers', component: ListEmployersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
