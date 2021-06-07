/*
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { RequestsService } from '../requests.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private requestsService: RequestsService
  ) {
  }

  // tslint:disable-next-line:typedef
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.requestsService.currentUser;
    if (currentUser) {
      return true; // logged in
    } else {
      this.router.navigate(['register'], );
      return false; // not logged in --> redirect here
    }
  }
}
*/
