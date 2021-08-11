import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {AuthPageComponent} from './modules/auth-page/auth-page.component';
import {AppRoutingModule} from "./routing-service";
import {ExistingUserPageComponent} from './modules/existing-user-page/existing-user-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    ExistingUserPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
