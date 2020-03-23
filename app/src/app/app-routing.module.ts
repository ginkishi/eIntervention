import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NoPageFoundComponent } from "./no-page-found/no-page-found.component";
import { InterventionAddComponent } from "./interventions/intervention-add/intervention-add.component";
import { InterventionEditComponent } from "./interventions/intervention-edit/intervention-edit.component";
import { InterventionExportComponent } from "./interventions/intervention-export/intervention-export.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "intervention/add", component: InterventionAddComponent },
  { path: "intervention/export", component: InterventionExportComponent },
  { path: "intervention/edit/:id", component: InterventionEditComponent },
  { path: "logout", component: LoginComponent },
  { path: "**", component: NoPageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
