import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestsService } from '../app/services/requests.service';
import { ChatNamesService } from '../app/services/chat-names.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( private routes: Router,
               private requestsService: RequestsService,
               private chatNames: ChatNamesService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    const token = localStorage.getItem('currentUser');
    if (token) {
      return true;
      alert('you are logged in!');
    }
    else {
      this.routes.navigate(['/login']);
      alert('no account found, please register!');
      return false;
    }
  }

}
