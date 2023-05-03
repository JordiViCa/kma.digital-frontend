import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})

export class ChatComponent  implements OnInit {

  toggleViewChats: boolean = false;

  selectProject: boolean;
  project: string = "";
  selectChat: boolean;
  chat: any;
  projects: any = {};


  message: string = "";
  errorMessage: boolean = false;
  createNewChat: boolean = false;

  constructor(
    private chatSVC: ChatService,
    private userSVC: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    
    this.selectProject = false;
    this.selectChat = false;
    if (this.route.snapshot.paramMap.get('idchat')) {
      this.chatSVC.getChat(this.route.snapshot.paramMap.get('idchat')!).subscribe(
        (chat: any) => {
          this.chat = chat.data;
          this.toggleViewChats = true;
        }
      )
    }
    this.chatSVC.getChats().subscribe((chat: any) => {
      chat.data.forEach((chat: any) => {
        if (chat.project) {
          if (this.projects[chat.project.name]) {
            this.projects[chat.project.name].push(chat);
          } else {
            this.projects[chat.project.name] = [chat];
          }
        } else {
          if (this.projects["noProject"]) {
            this.projects["noProject"].push(chat);
          } else {
            this.projects["noProject"] = [chat];
          }
        }
      });
    })
  }

  ngOnInit() {}

  updateMessage(message: any) {
    this.message = message.target.innerText.replace(/\n/g,"<br>");
  }

  getLenght(pr: any) {
    return pr.value.length > 1 ? pr.value.length + " chats":pr.value.length + " chat";
  }

  getValue(pr: any) {
    return pr;
  }

  getH(pr: any) {
    return "max-height: " + pr.length*32 + "px;";
  }
  /*
  createChat() {
    if (this.newChatForm.invalid) {
      this.newChatForm.markAllAsTouched();
      if (this.message.length == 0) {
        this.errorMessage = true;
      } else {
        this.errorMessage = false;
      }
      return
    }
    if (this.message.length == 0) {
      this.errorMessage = true;
      return;
    }
    this.errorMessage = false;
    let params: {
      titol: string,
      project?: string
    } = {
      titol: this.newChatForm.get('title')?.value
    }
    if (this.project != "" && this.project != "noProject") {
      params.project = this.project;
    }
    this.chatSVC.newChat(params).subscribe(
      (el: any) => {
        if (!el) {
          this.newChatForm.get('title')?.setErrors({'incorrect': true})
          return
        }
        let paramsMessage = {
          chat: el.data._id,
          text: this.message
        }
        this.chatSVC.newMessage(paramsMessage).subscribe(
          (msg: any) => {
            this.router.navigateByUrl("/client/chat/"+el.data._id)
          }
        )
      }
    )
  }
  */

  sendMessage(message: any) {
    let paramsMessage = {
      chat: this.chat._id,
      text: message
    }
    this.chatSVC.newMessage(paramsMessage).subscribe(
      (msg: any) => {
        this.chatSVC.getChat(this.route.snapshot.paramMap.get('idchat')!).subscribe(
          (chat: any) => {
            this.chat = chat.data;
          }
        )
      }
    )
  }

  setProject(pr: any) {
    if (this.project == pr.key) {
      this.project = "";
      return;
    }
    this.project = pr.key;
  }
}
