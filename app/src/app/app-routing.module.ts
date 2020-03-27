import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NoPageFoundComponent } from "./no-page-found/no-page-found.component";
import { InterventionAddComponent } from "./interventions/intervention-add/intervention-add.component";
import { InterventionEditComponent } from "./interventions/intervention-edit/intervention-edit.component";
import { InterventionExportComponent } from "./interventions/intervention-export/intervention-export.component";
import { ProfilComponent } from "./profil/profil.component";
import { AuthGuard } from "./auth.guard";
import { InterventionListComponent } from "./interventions/intervention-list/intervention-list.component";
import { InterventionViewComponent } from "./interventions/intervention-view/intervention-view.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    redirectTo: "/home",
    pathMatch: "full"
  },
  { path: "profil", canActivate: [AuthGuard], component: ProfilComponent },
  { path: "home", canActivate: [AuthGuard], component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "pompier/:id", canActivate: [AuthGuard], component: ProfilComponent },
  {
    path: "intervention/add",
    canActivate: [AuthGuard],
    component: InterventionAddComponent
  },
  {
    path: "intervention/list",
    canActivate: [AuthGuard],
    component: InterventionListComponent
  },
  {
    path: "intervention/export",
    canActivate: [AuthGuard],
    component: InterventionExportComponent
  },
  {
    path: "intervention/edit/:id",
    canActivate: [AuthGuard],
    component: InterventionEditComponent
  },
  {
    path: "intervention/:id",
    canActivate: [AuthGuard],
    component: InterventionViewComponent
  },
  { path: "logout", component: LoginComponent },
  { path: "**", component: NoPageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
