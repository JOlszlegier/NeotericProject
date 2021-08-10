import {RouterModule, Routes} from "@angular/router";
import {AuthPageComponent} from "../../modules/auth-page/auth-page.component";
import {NgModule} from "@angular/core";
import {NewUserPageComponent} from "../../modules/new-user-page/new-user-page.component";
import {ExistingUserPageComponent} from "../../modules/existing-user-page/existing-user-page.component";

const routes: Routes = [
  {path: '', component: AuthPageComponent},
  {path: 'new-user', component: NewUserPageComponent},
  {path: 'main', component: ExistingUserPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
