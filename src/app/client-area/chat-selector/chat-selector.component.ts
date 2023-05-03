import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-selector',
  templateUrl: './chat-selector.component.html',
  styleUrls: ['./chat-selector.component.scss'],
})
export class ChatSelectorComponent  implements OnInit {

  @Input() projects: any;
  @Input() toggleViewChats: boolean = false;
  project: any;

  constructor() { }

  ngOnInit() {}

  setProject(pr: any) {
    if (this.project == pr.key) {
      this.project = "";
      return;
    }
    this.project = pr.key;
  }

  getLenght(pr: any) {
    return pr.value.length > 1 ? pr.value.length + " chats":pr.value.length + " chat";
  }

}
