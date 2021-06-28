import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( private routes: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    const token = localStorage.getItem('currentUser');
    if (token) {
      return true;
    }
    else {
      this.routes.navigate(['/login']);
      alert('no account found, please register!');
      return false;
    }
  }
}
