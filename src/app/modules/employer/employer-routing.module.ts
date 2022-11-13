import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DetailPersonComponent} from "./pages/detail-person/detail-person.component";
import {ListEmployersComponent} from "./pages/list-employers/list-employers.component";


const routes: Routes = [
  {path: '', component: ListEmployersComponent},
  {path: 'detail-person/:id', component: DetailPersonComponent},
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class EmployerRoutingModule {
}
