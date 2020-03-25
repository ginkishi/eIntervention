import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";


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
import { NoPageFoundComponent } from "./no-page-found/no-page-found.component";
import { InterventionAddComponent } from "./interventions/intervention-add/intervention-add.component";
import { InterventionEditComponent } from "./interventions/intervention-edit/intervention-edit.component";
import { InterventionExportComponent } from "./interventions/intervention-export/intervention-export.component";
import { ProfilComponent } from "./profil/profil.component";
import { AuthentificationService } from "./services/authentification.service";
import { AuthGuard } from "./auth.guard";
import { BrigadeApiService } from "./services/brigade-api.service";
import { InterventionListComponent } from './interventions/intervention-list/intervention-list.component';

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
    InterventionExportComponent,
    ProfilComponent,
    InterventionListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [BrigadeApiService, AuthentificationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIconPacks(fas, far);
  }
}
