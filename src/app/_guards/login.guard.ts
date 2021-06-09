import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestsService } from '../requests.service';
import { ChatNamesService } from '../chat-names.service';


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
    const user = this.requestsService.currentUser;
    if (user) {
      return true;
    }
    else {
      this.routes.navigate(['/login']);
      alert('enter valid credentials');
      return false;
    }
  }

}
