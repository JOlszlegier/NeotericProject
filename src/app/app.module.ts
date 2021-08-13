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
import {MainPageComponent} from './modules/main-page/main-page.component';
import {HeaderComponent} from './modules/main-page/header/header.component';
import {MatIconModule} from "@angular/material/icon";
import {CenterBoxComponent} from './modules/main-page/center-box/center-box.component';
import {SideBarLeftComponent} from './modules/main-page/side-bar-left/side-bar-left.component';
import {SideBarRightComponent} from './modules/main-page/side-bar-right/side-bar-right.component';
import {ViewChoiceComponent} from './modules/main-page/side-bar-left/view-choice/view-choice.component';
import {MatListModule} from "@angular/material/list";
import {SearchBarComponent} from './modules/main-page/side-bar-left/search-bar/search-bar.component';
import {FriendsComponent} from './modules/main-page/side-bar-left/friends/friends.component';
import {SearchPipe} from "./core/pipes/search.pipe";
import { GroupsComponent } from './modules/main-page/side-bar-left/groups/groups.component';
import { AddGroupPageComponent } from './modules/add-group-page/add-group-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    MainPageComponent,
    HeaderComponent,
    CenterBoxComponent,
    SideBarLeftComponent,
    SideBarRightComponent,
    ViewChoiceComponent,
    SearchBarComponent,
    FriendsComponent,
    SearchPipe,
    GroupsComponent,
    AddGroupPageComponent
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
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
