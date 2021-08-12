import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {AuthPageComponent} from "./modules/auth-page/auth-page.component";
import {MainPageComponent} from "./modules/main-page/main-page.component";

const routes: Routes = [
  {path: '', component: AuthPageComponent},
  {path: 'main', component: MainPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
