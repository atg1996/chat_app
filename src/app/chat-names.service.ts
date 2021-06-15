import {Injectable} from '@angular/core';
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
  }

  userInfo(myInfo: number): void {
    this.myInfoB.next(myInfo);
  }

  getUsers(): any[] {
    return this.users;
  }

  getUserMessages(userId: number): any[] {
    const user = this.getUsers().filter(u => u.id === userId).pop();
    return user ? user.messages : [];
  }
}







