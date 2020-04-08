import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthentificationService } from "../services/authentification.service";

@Injectable({
  providedIn: "root"
})
export class ExportAccessGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    this.auth.rights.checkRight();
    if (this.auth.rights.haveExportingAccess()) {
      return true;
    } else {
      this.router.navigate(["forbidden"]);
    }
  }
  constructor(private auth: AuthentificationService, private router: Router) { }
}
