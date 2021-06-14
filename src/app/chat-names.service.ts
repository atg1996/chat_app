import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestsService } from './requests.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatNamesService {



  public users: any = [];
  private usersB = new BehaviorSubject(this.users);
  sharedUsers = this.usersB.asObservable();
  public myInfo: any = [];
  private myInfoB = new BehaviorSubject(this.myInfo);
  sharedMyInfo = this.myInfoB.asObservable();


  constructor() {
  }

  setUsers(users: any): void {
    this.usersB.next(users);
    console.log("setUsers", this.usersB);
  }

  userInfo(myInfo: number): void {
    this.myInfoB.next(myInfo);
    console.log('this is my info', myInfo);
  }

  getUsers(): any[] {
    console.log(this.users);
    console.log("getUsers", this.users);
    return this.users;
  }

  getUserMessages(userId: number): any[] {
    const user = this.getUsers().filter(u => u.id === userId).pop();

    return user ? user.messages : [];
  }
}







