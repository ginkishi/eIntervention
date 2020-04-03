import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('setupTime') != null) {
      const now = new Date().getTime();
      const setupTime = localStorage.getItem('setupTime');
      const hour = 1;
      if (now - Number(setupTime) < hour * 60 * 60 * 1000) {
        return true;
      } else {
        this.authService.signOut();
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
  constructor(
    private authService: AuthentificationService,
    private router: Router
  ) { }
}
