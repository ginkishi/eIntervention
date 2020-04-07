import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { AutocompleteModule } from "ng2-input-autocomplete";
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { NoPageFoundComponent } from "./no-page-found/no-page-found.component";
import { InterventionAddComponent } from "./interventions/intervention-add/intervention-add.component";
import { InterventionEditComponent } from "./interventions/intervention-edit/intervention-edit.component";
import { InterventionExportComponent } from "./interventions/intervention-export/intervention-export.component";
import { ProfilComponent } from "./profil/profil.component";
import { AuthentificationService } from "./services/authentification.service";
import { AuthGuard } from "./guards/auth.guard";
import { BrigadeApiService } from "./services/brigade-api.service";
import { InterventionListComponent } from "./interventions/intervention-list/intervention-list.component";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import localeFrExtra from "@angular/common/locales/extra/fr";
import { InterventionViewComponent } from "./interventions/intervention-view/intervention-view.component";
import { VehiculeListComponent } from "./vehicules/vehicule-list/vehicule-list.component";
import { VehiculeViewComponent } from "./vehicules/vehicule-view/vehicule-view.component";
import { RightAccessService } from "./services/right-access.service";
import { ExportAccessGuard } from "./guards/export-access.guard";
import { ForbiddenPageComponent } from "./forbidden-page/forbidden-page.component";
import { WritingAccessGuard } from "./guards/writing-access.guard";
import { EditingAccessGuard } from "./guards/editing-access.guard";
import { Ng2CompleterModule } from 'ng2-completer';
import { InterventionSearchComponent } from './interventions/intervention-search/intervention-search.component';
import { ExportService } from './services/export.service';
registerLocaleData(localeFr, "fr-FR", localeFrExtra);
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
    InterventionListComponent,
    InterventionViewComponent,
    VehiculeListComponent,
    VehiculeViewComponent,
    ForbiddenPageComponent,
    InterventionSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    Ng2CompleterModule,
    AutocompleteModule.forRoot()
  ],
  exports: [MatAutocompleteModule],
  providers: [
    BrigadeApiService,
    AuthentificationService,
    AuthGuard,
    ExportAccessGuard,
    DatePipe,
    RightAccessService,
    WritingAccessGuard,
    EditingAccessGuard,
    ExportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIconPacks(fas, far);
  }
}
