import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {AuthPageComponent} from './modules/auth-page/auth-page.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./core/services/routing-service";
import { NewUserPageComponent } from './modules/new-user-page/new-user-page.component';
import { ExistingUserPageComponent } from './modules/existing-user-page/existing-user-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    NewUserPageComponent,
    ExistingUserPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
