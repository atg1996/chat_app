import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, pipe} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {IUser} from '../models/user.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private static readonly URL_REGISTER = environment.main_url + '/register';
  private static readonly URL_LOGIN = environment.main_url + '/login';
  private static readonly URL_PROFILE = environment.main_url + '/profile';
  private static readonly URL_MESSAGE = environment.main_url + '/message';
  private static readonly URL_MESSAGES = environment.main_url + '/messages';
  private static readonly URL_CHAT = environment.main_url + '/chatroom';

  public currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser') as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
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
    console.log(RequestsService.URL_REGISTER);
    return this.http.post<any>(RequestsService.URL_REGISTER, data);
  }

  loginService(loginData: any): Observable<any> {
    const resp = this.http.post<any>(RequestsService.URL_LOGIN, loginData);
    return resp
      .pipe(
        map(currentUser => {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.currentUserSubject.next(currentUser);
          return currentUser;
        }),
        catchError(err => of(err.error.message))
      );
  }

//  TODO: change get users logic and get messages logic.
/*  getUsers(): Observable<IUser> {

  }*/
}

