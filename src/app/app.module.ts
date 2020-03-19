import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MenuComponent } from "./menu/menu.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { ClockComponent } from "./clock/clock.component";
import {
  FontAwesomeModule,
  FaIconLibrary
} from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { InterventionAddComponent } from './interventions/intervention-add/intervention-add.component';
import { InterventionEditComponent } from './interventions/intervention-edit/intervention-edit.component';
import { InterventionExportComponent } from './interventions/intervention-export/intervention-export.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    ClockComponent,
    NoPageFoundComponent,
    InterventionAddComponent,
    InterventionEditComponent,
    InterventionExportComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIconPacks(fas, far);
  }
}
