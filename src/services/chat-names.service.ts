import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatNamesService {

  public users: any = JSON.parse(localStorage.getItem('currentUser') || '{}').usernames || [];
  private usersB = new BehaviorSubject(this.users);
  sharedUsers = this.usersB.asObservable();
  public myInfo: number = JSON.parse(localStorage.getItem('currentUser') || '{}').user_id;
  private myInfoB = new BehaviorSubject<number>(this.myInfo);
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







