import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent  implements OnInit {

  selectProject: boolean;
  project: string = "";
  selectChat: boolean;
  chat: string = "";
  chats: any[] = [];

  constructor(
    private chatSVC: ChatService,
    private userSVC: UserService
  ) {
    this.selectProject = false;
    this.selectChat = false;
    this.userSVC.getActualUser().subscribe(
      (user: any) => {
        this.chatSVC.getChats(user.client.id).subscribe((chat: any) => {
          console.log("Chat",chat)
        })
        this.chatSVC.getChats2().subscribe((el: any) => {
          console.log(el)
        })
      }
    )
  }

  ngOnInit() {}

}
