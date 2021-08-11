import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {AuthPageComponent} from "./modules/auth-page/auth-page.component";
import {ExistingUserPageComponent} from "./modules/existing-user-page/existing-user-page.component";

const routes: Routes = [
  {path: '', component: AuthPageComponent},
  {path: 'main', component: ExistingUserPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
