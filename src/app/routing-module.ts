import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {AuthPageComponent} from "./modules/auth-page/auth-page.component";
import {MainPageComponent} from "./modules/main-page/main-page.component";
import {AddGroupPageComponent} from "./modules/add-group-page/add-group-page.component";
import {AuthGuardService} from "./core/services/auth-guard-service";

const routes: Routes = [
  {path: '', component: AuthPageComponent},
  {path: 'main', canActivate: [AuthGuardService], component: MainPageComponent},
  {path: 'new-group', canActivate: [AuthGuardService], component: AddGroupPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
