import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: "", redirectTo: "persons", pathMatch: "full"},
  {path: 'persons', loadChildren: () => import('./modules/employer/employer.module').then(module => module.EmployerModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
