import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";

import {AppComponent} from './app.component';
import {AuthPageComponent} from './modules/auth-page/auth-page.component';
import {AppRoutingModule} from "./routing-module";
import {ExistingUserPageComponent} from './modules/existing-user-page/existing-user-page.component';
import {MainPageComponent} from './modules/main-page/main-page.component';
import {HeaderComponent} from './modules/main-page/header/header.component';
import {MatIconModule} from "@angular/material/icon";
import { CenterBoxComponent } from './modules/main-page/center-box/center-box.component';
import { SideBarLeftComponent } from './modules/main-page/side-bar-left/side-bar-left.component';
import { SideBarRightComponent } from './modules/main-page/side-bar-right/side-bar-right.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    ExistingUserPageComponent,
    MainPageComponent,
    HeaderComponent,
    CenterBoxComponent,
    SideBarLeftComponent,
    SideBarRightComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
