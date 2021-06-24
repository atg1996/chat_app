import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChatNamesService} from '../../services/chat-names.service';
import {FormBuilder, Validators} from '@angular/forms';
import {RequestsService} from '../../services/requests.service';
import {Socket} from 'ngx-socket-io';
import {WrappedSocket} from 'ngx-socket-io/src/socket-io.service';
import {environment} from '../../environments/environment';
import {IUser} from '../../models/user.model';
import {IMessage } from '../../models/message.model';
import {of} from 'rxjs';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
})

export class ChatroomComponent implements OnInit, OnDestroy {
  sendMessageForm = this.formBuilder.group({
    sentMessage: ['', Validators.required],
  });

  users: IUser[];
  receiver: number;
  sender: number;
  senders: any;
  userId: number;

  currentUser: IUser | undefined;
  currentUserSubject: any;
  messages: IMessage[];

  @ViewChild('messagesContainer') messagesContainer: ElementRef | undefined;
  private socket: WrappedSocket | undefined;
  private offset = 0;
  private limit = 0;


  constructor(
    private route: ActivatedRoute,
    private chatNames: ChatNamesService,
    private requests: RequestsService,
    private formBuilder: FormBuilder,
  ) {

    this.userId = JSON.parse(localStorage.getItem('currentUser') || '{}').user_id;
    // TODO: cleanup
    this.users = [];
    this.receiver = 0;
    this.sender = 0;
    this.senders = [];

    this.messages = [];
    this.currentUserSubject = this.requests.currentUserSubject;
  }

  ngOnInit(): void {
    this.getUsers();
    this.setSocketConnection();
    this.chatNames.sharedMyInfo.subscribe(myInfo => this.sender = myInfo);
    this.requests.getMessage(this.sender, this.receiver).subscribe(res => {
      this.messages = res;
    });
  }

  getUsers(): void {
    this.requests.getUsers(this.userId).subscribe(res => {
      if (res.success) {
        this.users = res.users;
      }
    });
  }

  loadMoreUsers(): void {
    this.offset += 15;
    this.limit = 15;
    this.requests.getUsers(this.userId, this.offset, this.limit).subscribe(res => {
      if (res.success) {
        this.users = this.users.concat(res.users);
      }
    });
  }

  ngOnDestroy(): void {
    this.socket?.disconnect();
  }


  loadMessages(user: IUser): void {
    this.receiver = user.id;
    this.currentUser = user;
    this.messages = [];
    this.requests.getMessage(this.sender, this.receiver).subscribe(res => {
      this.messages = res.reverse();
      setTimeout(() => {
        this.messagesContainer?.nativeElement.scrollTo({
          top: this.messagesContainer?.nativeElement.scrollHeight,
        });
      }, 0);
    });
  }

  loadMoreMessages(user: any ): void {
    this.offset += 15;
    this.limit = 15;
    this.receiver = user.id;
    this.currentUser = user;
    this.requests.getMessage(this.sender, this.receiver, this.offset, this.limit).subscribe(res => {
      if (res.length) {
        this.messages = res.reverse().concat(this.messages);
      }
    });
  }


  messageSent(): void {
    if (this.sendMessageForm?.valid) {
      this.socket?.emit('message sent', {
        senderId: this.sender,
        receiverId: this.receiver,
        msg: this.sendMessageForm.getRawValue().sentMessage,
      });
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  resetValue(): void {
    this.sendMessageForm.reset();
  }

  private setSocketConnection(): void {
    this.socket = new Socket({
      url: environment.main_url,
      options: {
        query: `userId=${this.userId}`
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
        setTimeout(() => {
          this.messagesContainer?.nativeElement.scrollTo({
            top: this.messagesContainer?.nativeElement.scrollHeight,
            behavior: 'smooth'
          });
        }, 0);
      }
    });
  }

  onScroll($event: Event): void {
    if (this.messagesContainer?.nativeElement.scrollTop === 0) {
      setTimeout(() => {
      this.loadMoreMessages(this.currentUser);
      }, 500);
    }
  }
}

