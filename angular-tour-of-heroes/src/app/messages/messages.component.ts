import { Component, OnInit } from '@angular/core';
import { MessageService } from '../service/message.service';
import { MessageStatus } from '../enums/MessageStatus.enum';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
  }

  public get MessageStatus() {
    return MessageStatus; 
  }

}
