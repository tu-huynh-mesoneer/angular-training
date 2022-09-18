import { Injectable } from '@angular/core';
import { MessageStatus } from '../enums/MessageStatus.enum';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  isActive: Boolean = false;
  messageTimeOut: any;
  status?: MessageStatus;

  add(message: string, status: MessageStatus) {
    if (this.messageTimeOut && this.status == status) {
      window.clearTimeout(this.messageTimeOut);
      this.messageTimeOut = null;
    } else {
      this.status = status;
      this.messages = [];
    }
    this.isActive = true;
    this.messages.push(message);
    this.messageTimeOut = setTimeout(this.clear, 3000);
  }

  clear = () => {
    this.isActive = false;
    this.messageTimeOut = null;
    this.status = undefined;
  }
}


