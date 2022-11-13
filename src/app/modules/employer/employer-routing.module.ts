import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DetailPersonComponent} from "./pages/detail-person/detail-person.component";
import {ListEmployersComponent} from "./pages/list-employers/list-employers.component";
import {FormPersonComponent} from "./pages/form-person/form-person.component";


const routes: Routes = [
  {path: '', component: ListEmployersComponent},
  {path: 'detail-person/:id', component: DetailPersonComponent},
  {path: 'create', component: FormPersonComponent},
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class EmployerRoutingModule {
}
