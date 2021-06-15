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
  senders: any;

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
    this.senders = [];

    this.currentUser = [];
    this.messages = [];
    this.currentUserSubject = this.requests.currentUserSubject;
  }

  ngOnInit() {
    this.chatNames.sharedUsers.subscribe(users => (this.users = users));
    this.chatNames.sharedMyInfo.subscribe(myInfo => (this.sender = myInfo));
    this.loadMessages(1);
  }





  loadMessages(userId: number): void {
    this.receiver = userId;
    this.requests.getMessage().subscribe(result => {
      console.log('works fine');
    });
  }

  messageSent() {
    this.sendMessageForm.value.receiver = this.receiver; // send receiver id with request
    this.sendMessageForm.value.sender = this.sender; // send sender id with request
    if (this.sendMessageForm?.valid) {
      this.requests.sendMessage(this.sendMessageForm?.value).subscribe(result => {
        console.log(result);

      });

    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
