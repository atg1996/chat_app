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
  private static readonly BASE_URL = 'http://192.168.1.22:8000';
  private static readonly URL_REGISTER = RequestsService.BASE_URL + '/register';
  private static readonly URL_LOGIN = RequestsService.BASE_URL + '/login';
  private static readonly URL_PROFILE = RequestsService.BASE_URL + '/profile';
  private static readonly URL_MESSAGE = RequestsService.BASE_URL + '/message';
  private static readonly URL_MESSAGES = RequestsService.BASE_URL + '/messages';
  private static readonly URL_CHAT = RequestsService.BASE_URL + '/chatroom';

  public currentUserSubject: BehaviorSubject<User>;
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

  getMessage(sender: number, receiver: number): Observable<any> {
    const data = {sender, receiver};
    return this.http.post<any>(RequestsService.URL_MESSAGES, data);

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
