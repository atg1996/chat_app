import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatNamesService {

  public myInfo: number = JSON.parse(localStorage.getItem('currentUser') || '{}').user_id;
  private myInfoB = new BehaviorSubject<number>(this.myInfo);
  sharedMyInfo = this.myInfoB.asObservable();

  constructor() {
  }

  userInfo(myInfo: number): void {
    this.myInfoB.next(myInfo);
  }

}







