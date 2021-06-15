import { Injectable } from '@angular/core';
import {ChatNamesService } from './chat-names.service';

@Injectable({
  providedIn: 'root'
})
export class ChatheadTopService {

  constructor(private chatNames: ChatNamesService) {

  }

  getName() {
    const field = this.chatNames.getNames();
  }

}
