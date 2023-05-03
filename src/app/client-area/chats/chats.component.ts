import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})

export class ChatsComponent  implements OnInit {

  project: string = "";
  chat: any;
  projects: any = {};
  userId: string = "";

  newChatForm: FormGroup;
  errorMessage: boolean = false;
  createNewChat: boolean = false;

  config: AngularEditorConfig = {
    editable: true,
    enableToolbar: true,
    showToolbar: true,
    //uploadUrl: 'v1/image',
    //upload: (file: File) => { ... }
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertOrderedList',
        'heading',
        'fontName'
      ],
      [
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };

  constructor(
    private chatSVC: ChatService,
    private userSVC: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.newChatForm = this.formBuilder.group({
      title: ["",[Validators.required]],
      htmlContent: ["",[Validators.required]]
    });
    this.userSVC.getActualUser().subscribe(
      (user: any) => {
        this.userId = user._id;
      }
    )
    if (this.route.snapshot.paramMap.get('idchat')) {
      this.chatSVC.getChat(this.route.snapshot.paramMap.get('idchat')!).subscribe(
        (chat: any) => {
          this.chat = chat.data;
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

  getLenght(pr: any) {
    return pr.value.length > 1 ? pr.value.length + " chats":pr.value.length + " chat";
  }

  getValue(pr: any) {
    return pr;
  }

  getH(pr: any) {
    return "max-height: " + pr.length*32 + "px;";
  }

  createChat() {
    if (this.newChatForm.invalid) {
      this.newChatForm.markAllAsTouched();
      return
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
          text: this.newChatForm.value.htmlContent
        }
        this.chatSVC.newMessage(paramsMessage).subscribe(
          (msg: any) => {
            this.router.navigateByUrl("/client/chat/"+el.data._id)
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
