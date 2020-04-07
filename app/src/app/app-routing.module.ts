import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NoPageFoundComponent } from "./no-page-found/no-page-found.component";
import { InterventionAddComponent } from "./interventions/intervention-add/intervention-add.component";
import { InterventionEditComponent } from "./interventions/intervention-edit/intervention-edit.component";
import { InterventionExportComponent } from "./interventions/intervention-export/intervention-export.component";
import { ProfilComponent } from "./profil/profil.component";
import { AuthGuard } from "./guards/auth.guard";
import { InterventionListComponent } from "./interventions/intervention-list/intervention-list.component";
import { InterventionViewComponent } from "./interventions/intervention-view/intervention-view.component";
import { VehiculeListComponent } from "./vehicules/vehicule-list/vehicule-list.component";
import { VehiculeViewComponent } from "./vehicules/vehicule-view/vehicule-view.component";
import { ExportAccessGuard } from "./guards/export-access.guard";
import { ForbiddenPageComponent } from "./forbidden-page/forbidden-page.component";
import { WritingAccessGuard } from "./guards/writing-access.guard";
import { EditingAccessGuard } from "./guards/editing-access.guard";
import { InterventionSearchComponent } from './interventions/intervention-search/intervention-search.component';

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    redirectTo: "/home",
    pathMatch: "full"
  },
  { path: "forbidden", component: ForbiddenPageComponent },
  { path: "profil", canActivate: [AuthGuard], component: ProfilComponent },
  { path: "home", canActivate: [AuthGuard], component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "pompier/:id", canActivate: [AuthGuard], component: ProfilComponent },

  {
    path: "intervention/edit/:id",
    canActivate: [AuthGuard],
    component: InterventionEditComponent
  },
  {
    path: "intervention",
    canActivate: [AuthGuard],
    component: InterventionListComponent
  },
  {
    path: 'intervention/valid',
    canActivate: [AuthGuard],
    component: InterventionListComponent,
    data: { type: 'valid' }
  },
  {
    path: 'intervention/waiting',
    canActivate: [AuthGuard],
    component: InterventionListComponent,
    data: { type: 'waiting' }
  },
  {
    path: 'intervention/novalid',
    canActivate: [AuthGuard],
    component: InterventionListComponent,
    data: { type: 'novalid' }
  },
  {
    path: "intervention/add",
    canActivate: [AuthGuard, WritingAccessGuard],
    component: InterventionAddComponent
  },
  {
    path: "intervention/export",
    canActivate: [AuthGuard, ExportAccessGuard],
    component: InterventionExportComponent
  },
  {
    path: "intervention/edit/:id",
    canActivate: [AuthGuard, EditingAccessGuard],
    component: InterventionEditComponent
  },
  {

    path: "intervention/:id",
    canActivate: [AuthGuard],
    component: InterventionViewComponent
  },
  {
    path: "intervention/search",
    component: InterventionSearchComponent
  },
  {
    path: "vehicule",
    canActivate: [AuthGuard],
    component: VehiculeListComponent
  },
  {
    path: "vehicule/:id",
    canActivate: [AuthGuard],
    component: VehiculeViewComponent
  },
  { path: "logout", component: LoginComponent },
  { path: "**", component: NoPageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
