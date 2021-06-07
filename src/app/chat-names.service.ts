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

  constructor() {
  }

  setUsers(users: any): void {
    this.usersB.next(users);
    console.log("setUsers", this.usersB);
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
  //
  // sendMessage(userId: number, message: string): void {
  //   const user = this.getUsers().filter(u => u.id === userId).pop();
  //   if (user) {
  //     console.log(user);
  //     user.messages.push({id: 150, message: message, self: true});
  //   }
  // }
}

// any[] = [
// {
//   id: 1, name: 'Adam Sandler', messages: [
//     {id: 1, message: 'Hi what are you doing???', self: true},
//     {id: 2, message: 'Hasta la vista babe', self: false},
//     {id: 3, message: 'Hi what are you doing???', self: true},
//   ]
// },
// {id: 2, name: 'Arnold Schwarzenegger', messages: []},
// {
//   id: 3, name: 'Anna Frank', messages: [
//     {id: 7, message: 'Hasta la vista babe', self: false},
//     {id: 8, message: 'Hi what are you doing???', self: true},
//     {id: 9, message: 'Hasta la vista babe', self: false},
//     {id: 10, message: 'Hi what are you doing???', self: true},
//     {id: 11, message: 'Hasta la vista babe', self: false},
//     {id: 12, message: 'Hasta la vista babe', self: false},
//   ]
// },
// {id: 4, name: 'John Johnson', messages: []},
// {id: 5, name: 'Hovo', messages: []},





/*public usr = [
{
id: 1, name: 'Adam Sandler', messages: [
  {id: 1, message: 'Hi what are you doing???', self: true},
  {id: 2, message: 'Hasta la vista babe', self: false},
  {id: 3, message: 'Hi what are you doing???', self: true},
]
}];*/
