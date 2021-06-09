import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {ChatNamesService} from '../chat-names.service';
import {FormControl} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RequestsService } from '../requests.service';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
})

export class ChatroomComponent implements OnInit {
  sendMessageForm = this.formBuilder.group({
    sentMessage: ['', Validators.required],
    receiver: [0, Validators.required],
    }
  );
  logReceived: any[];
  users: any;
  receiver: number;
  sender: any;

  currentUser: any;
  currentUserSubject: any;
  messages: any[];
  myMessage = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private chatNames: ChatNamesService,
    private requests: RequestsService,
    private formBuilder: FormBuilder,
  ) {
    this.logReceived = [];
    this.users = [];
    this.receiver = 0;
    this.sender = 0;

    this.currentUser = [];
    this.messages = [];
    this.currentUserSubject = this.requests.currentUserSubject;
  }

  ngOnInit() {
    this.chatNames.sharedUsers.subscribe(users => (this.users = users));
    this.getNameFromServiceNames();
  }

  getNameFromServiceNames(): void {
    //console.log("chatRoomComponent", this.users);
  }

  loadMessages(userId: number): void {
    console.log(userId);
    this.receiver = userId;



    //this.currentUser = this.users.filter((user: any) => user.id === userId).pop();
     //this.users = this.chatNames.getUsers();
     //this.messages = this.chatNames.getUserMessages(userId);
     //console.log("asdasd", this.currentUser);
  }

  messageSent(receiver: number, sender: number) {
    this.sendMessageForm.value.receiver = this.receiver; // send receiver id with request
    this.sendMessageForm.value.sender = this.sender;  // send sender id with request
    if (this.sendMessageForm?.valid) {
      this.requests.sendMessage(this.sendMessageForm?.value).subscribe(result => {
        console.log(result);
      });

    }
  }

  logout() {
    console.log("davay aper jan");
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }



  /*messageSent() {
    this.nameService.sendMessage(this.currentUser.id, this.myMessage.value);
    this.loadMessages(this.currentUser.id);
    this.myMessage.setValue('');
    this.requests.sendMessage();
    this.requests.getMessage();
  }*/
}
