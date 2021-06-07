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
  sender: number;

  currentUser: any;
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

  messageSent(receiver: number) {
    this.sendMessageForm.value.receiver = this.receiver; // send receiver id with request
    this.sendMessageForm.value.sender = this.sender;
    if (this.sendMessageForm?.valid) {
      this.requests.sendMessage(this.sendMessageForm?.value).subscribe(result => {
        console.log("log", result);
      });

    }
  }

  /*messageSent() {
    this.nameService.sendMessage(this.currentUser.id, this.myMessage.value);
    this.loadMessages(this.currentUser.id);
    this.myMessage.setValue('');
    this.requests.sendMessage();
    this.requests.getMessage();
  }*/
}
