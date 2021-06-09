import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, pipe} from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './_models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private static readonly URL_REGISTER = 'http://localhost:8000/register';
  private static readonly URL_LOGIN = 'http://localhost:8000/login';
  private static readonly URL_PROFILE = 'http://localhost:8000/profile';
  private static readonly URL_MESSAGE = 'http://localhost:8000/message';
  private static readonly URL_CHAT = 'http://localhost:8000/chatroom';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  sendMessage(data: any): Observable<any> {
    return this.http.post<any>(RequestsService.URL_MESSAGE, data);
  }

  getMessage(): Observable<any> {
    return this.http.get<any>(RequestsService.URL_MESSAGE);
  }

  sendRegisterInfo(data: any): Observable<any> {
    return this.http.post<any>(RequestsService.URL_REGISTER, data);
  }

  loginService(loginData: any): Observable<any> {
    const resp = this.http.post<any>(RequestsService.URL_LOGIN, loginData);
    return resp
      .pipe(map(currentUser => {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.currentUserSubject.next(currentUser);
          return currentUser;
      }));
  }

  getDataService(token: any): Observable<any> {
    return this.http.get<any>(RequestsService.URL_PROFILE);
  }
}
