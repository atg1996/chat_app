import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {config, Observable} from 'rxjs';
/*

import { RequestsService} from '../requests.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private requestsService: RequestsService) { }
     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       const currentUser = this.requestsService.currentUserValue;
       const isLoggedIn = currentUser && currentUser.token;
       const isApiUrl = 'http://localhost:4200/login';
       if (isLoggedIn && isApiUrl) {
         req = req.clone({
           setHeaders: {
             Authorization: `Bearer ${currentUser.token}`
           }
         });
       }

       return next.handle(req);
     }
}
*/
