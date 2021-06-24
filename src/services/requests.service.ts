import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, pipe} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {IUser} from '../models/user.model';
import { environment } from '../environments/environment';
import {IRegisterInfo} from '../models/IRegisterInfo';
import {ILoginInfo } from '../models/ILoginInfo';

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
  private static readonly URL_USERS = environment.main_url + '/users';
  private static readonly URL_MOREUSERS = environment.main_url + '/moreUsers';

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

  getMessage(sender: number, receiver: number, offset: number = 0, limit: number = 15 ): Observable<any> {
    const data = {sender, receiver, offset, limit};
    return this.http.post<any>(RequestsService.URL_MESSAGES, data);

  }

  sendRegisterInfo(data: IRegisterInfo): Observable<IRegisterInfo> {
    return this.http.post<any>(RequestsService.URL_REGISTER, data);
  }

  loginService(loginData: ILoginInfo): Observable<ILoginInfo> {
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

  getUsers(userId: number, offset: number = 0, limit: number = 10): Observable<{success: boolean, users: IUser[]}> {
      return this.http.get<{success: boolean, users: IUser[]}>(RequestsService.URL_USERS + `?userId=${userId}&limit=${limit}&offset=${offset}`);
  }
}

