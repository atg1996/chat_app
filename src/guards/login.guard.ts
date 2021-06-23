import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestsService } from '../services/requests.service';
import { ChatNamesService } from '../services/chat-names.service';

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
    }
    else {
      this.routes.navigate(['/login']);
      alert('no account found, please register!');
      return false;
    }
  }

}
