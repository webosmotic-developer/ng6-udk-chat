import {Component, OnInit} from '@angular/core';
import {EmitterService} from '../../common/services/emitter/emitter.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  public message: string;
  public selectedUser: any;

  constructor() {
  }

  ngOnInit() {

    EmitterService.get('selectedUserInfo').subscribe((selectedUser: any) => {
      this.selectedUser = selectedUser;
    });
  }

}
