import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChatNamesService} from '../../services/chat-names.service';
import {FormControl} from '@angular/forms';
import {FormBuilder, Validators} from '@angular/forms';
import {RequestsService} from '../../services/requests.service';
import {Socket} from 'ngx-socket-io';
import {WrappedSocket} from 'ngx-socket-io/src/socket-io.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
})

export class ChatroomComponent implements OnInit, OnDestroy {
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
  private socket: WrappedSocket | undefined;

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
    this.setSocketConnection();
    this.chatNames.sharedUsers.subscribe(users => this.users = users);
    this.chatNames.sharedMyInfo.subscribe(myInfo => this.sender = myInfo);
    this.requests.getMessage(this.sender, this.receiver).subscribe(res => {
      this.messages = res;
    });
  }

  ngOnDestroy(): void {
    this.socket?.disconnect();
  }


  loadMessages(userId: number): void {
    this.receiver = userId;
    this.messages = [];
    this.requests.getMessage(this.sender, this.receiver)
      .subscribe(res => this.messages = res);
  }

  messageSent(): void {
    if (this.sendMessageForm?.valid) {
      this.socket?.emit('message sent', {
        senderId: this.sender,
        receiverId: this.receiver,
        msg: this.sendMessageForm.getRawValue().sentMessage
      });

    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  resetValue(): void {
    if (this.inputElement) {
      this.inputElement.nativeElement.value = '';
    }
  }

  private setSocketConnection(): void {
    const currentUserId = JSON.parse(localStorage.getItem('currentUser') || '{}').user_id;
    this.socket = new Socket({
      url: '127.0.0.1:3000',
      options: {
        query: `userId=${currentUserId}`
      }
    });

    this.socket.connect();

    this.socket.on('new message', (data: any) => {
      if (data.success) {
        this.messages.push({
          message: data.msg,
          receiver_id: data.receiverId,
          sender_id: data.senderId,
        });
      }
    });
  }
}

