import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChatNamesService} from '../services/chat-names.service';
import {FormControl} from '@angular/forms';
import {FormBuilder, Validators} from '@angular/forms';
import {RequestsService} from '../services/requests.service';
import {interval} from 'rxjs/internal/observable/interval';
import {startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
})

export class ChatroomComponent implements OnInit {
  sendMessageForm = this.formBuilder.group({
    sentMessage: ['', Validators.required],
    receiver: [0, Validators.required],
  });

  users: any[];
  receiver: number;
  sender: number;
  senders: any;
  timeInterval: any;

  currentUser: any;
  currentUserSubject: any;
  messages: any[];
  myMessage = new FormControl('');

  @ViewChild('inputElement') inputElement: ElementRef | undefined;

  constructor(
    private route: ActivatedRoute,
    private chatNames: ChatNamesService,
    private requests: RequestsService,
    private formBuilder: FormBuilder,
  ) {
    // TODO: cleanup
    this.users = [];
    this.receiver = 0;
    this.sender = 0;
    this.senders = [];

    this.currentUser = [];
    this.messages = [];
    this.currentUserSubject = this.requests.currentUserSubject;

  }

  ngOnInit(): void {
    this.chatNames.sharedUsers.subscribe(users => this.users = users);
    this.chatNames.sharedMyInfo.subscribe(myInfo => this.sender = myInfo);
    this.timeInterval = interval(3000)
      .pipe(
        startWith(0),
        switchMap(() => this.requests.getMessage(this.sender, this.receiver))
      )
      .subscribe(res => this.messages = res);
  }


  loadMessages(userId: number): void {
    this.receiver = userId;
    this.messages = [];
    this.requests.getMessage(this.sender, this.receiver)
      .subscribe(res => this.messages = res);
  }

  messageSent(): void {
    this.sendMessageForm.value.receiver = this.receiver; // send receiver id with request
    this.sendMessageForm.value.sender = this.sender; // send sender id with request
    if (this.sendMessageForm?.valid) {
      this.requests.sendMessage(this.sendMessageForm?.value).subscribe(result => {
        this.requests.getMessage(this.sender, this.receiver)
          .subscribe(res => this.messages = res);

      });

    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.timeInterval.unsubscribe();
  }

  resetValue(): void {
    if (this.inputElement) {
      this.inputElement.nativeElement.value = '';
    }
  }
}

