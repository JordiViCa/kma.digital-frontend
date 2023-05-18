import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ChatService } from 'src/app/services/chat.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent  implements OnInit {

  idProject: any;

  toggleViewChats: boolean = false;

  project: string = "";
  projectName: string = "";
  chat: any;
  userId: string = "";
  projects: any = [];
  chats: any;
  filter: string = "";
  idChat: string = "";

  responsiveMenu: boolean = this.route.snapshot.paramMap.get('idChat') ? true:false;


  newChatForm: FormGroup = this.formBuilder.group({
    title: ["",[Validators.required, Validators.maxLength(40)]],
    htmlContent: ["",[Validators.required]]
  });;

  chatForm: FormGroup = this.formBuilder.group({
    htmlContent: ["",[Validators.required]]
  });;
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

  errorMessage: boolean = false;
  createNewChat: boolean = false;

  constructor(
    private chatSVC: ChatService,
    private userSVC: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private projectSVC: ProjectService
  ) {
    this.idProject = this.route.snapshot.paramMap.get('idProject')!;
    this.project = this.idProject;
    if (this.idProject) {
      this.chatSVC.getProjectChats(this.idProject).subscribe(
        (el: any) => {
          console.log(el)
          let chats = el.data.sort((a:any,b:any) => (a.horaSolicitud > b.horaSolicitud) ? 1 : ((b.horaSolicitud > a.horaSolicitud) ? -1 : 0))
          chats = chats.sort((a: any, b: any) => (a.unreaded < b.unreaded) ? 1 : ((b.unreaded < a.unreaded) ? -1 : 0));
          chats = chats.sort((a: any, b: any) => (a.resolt === b.resolt)? 0 : a.resolt? 1 : -1);
          if (chats.length == 0) {
            this.responsiveMenu = true;
          }
          this.chats = chats;
        }
      )
      this.projectSVC.getProject(this.idProject).subscribe(
        (project: any) => {
          this.projectName = project.data.name;
        }
      )
    } else {
      this.projectSVC.getProjects().subscribe(
        (projects: any) => {
          this.projects = projects.data;
          this.chatSVC.getChats().subscribe(
            (chat: any) => {
              console.log("Chats",chat)
              this.projects.map(
                (pr: any) => {
                  console.log("Projects",pr)
                  let totalUnreaded = 0
                  pr.chats = [];
                  chat.data.forEach(
                    (chat: any) => {
                      if (chat.project && chat.project._id == pr._id) {
                        pr.chats.push(chat)
                        if (chat.unreaded > 0) {
                          console.log(chat.unreaded)
                          totalUnreaded += chat.unreaded; 
                        }
                      }
                    }
                  )
                  pr.unreaded = totalUnreaded;
                  return pr;
                }
              )
              let noProject = chat.data.filter(
                (chat: any) => {
                  if (!chat.project) {
                    return chat
                  }
                }
              )
              console.log("No Projects",noProject)
              if (noProject.length != 0) {
                let totalUnreaded = 0
                chat.data.forEach(
                    (chat: any) => {
                      if (chat.unreaded > 0) {
                        console.log(chat.unreaded)
                        totalUnreaded += chat.unreaded; 
                      }
                    }
                  )
                this.projects.push({
                  name: 'No project',
                  chats: noProject,
                  _id: 'noProject',
                  unreaded: totalUnreaded
                })
              }
              console.log("PR",this.projects,"PROJECTS")
            }
          )
        }
      )
    }
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('idChat')) {
      this.startChat()
    }
  }

  startChat() {
    this.chatSVC.getChat(this.route.snapshot.paramMap.get('idChat')!).subscribe(
      (chat: any) => {
        this.chat = chat.data;
        if (!this.idProject && chat.data.project) {
          this.router.navigateByUrl("/client/projects/"+chat.data.project._id+"/chat/"+this.route.snapshot.paramMap.get('idChat'))
        }
        console.log(chat)
        this.toggleViewChats = true;
        this.userSVC.getActualUser().subscribe(
          (user: any) => {
            this.userId = user.data._id;
            this.chat.messages.forEach(
              (message: any) => {
                if (message.sender._id != this.userId && !message.seenDate) {
                  this.chatSVC.markAsRead(message._id).subscribe(
                    (msg: any) => {
                      message.seenDate = new Date;
                    }
                  )
                }
              }
            )
          }
        )
        setTimeout(() => {
          console.log("In")
          if (this.router.url == "/client/chat/"+this.route.snapshot.paramMap.get('idChat') || this.router.url == "/client/projects/"+this.route.snapshot.paramMap.get('idProject')+"/chat/"+this.route.snapshot.paramMap.get('idChat'))  {
            console.log("Continue")
            this.startChat();
          }
        }, 5000);
      }
    )
  }

  createChat() {
    if (this.newChatForm.invalid || this.newChatForm.value.title.length <= 40) {
      this.newChatForm.markAllAsTouched();
    }
    this.errorMessage = false;
    let params: {
      titol: string,
      project?: string
    } = {
      titol: this.newChatForm.get('title')?.value
    }
    if ((this.idProject != "" || this.project != "") && this.project != "noProject") {
      params.project = this.idProject != "" ? this.idProject:this.project;
    }
    this.chatSVC.newChat(params).subscribe(
      (el: any) => {
        if (!el) {
          this.newChatForm.get('title')?.setErrors({'incorrect': true})
          return;
        }
        let paramsMessage = {
          chat: el.data._id,
          text: this.newChatForm.value.htmlContent
        }
        this.chatSVC.newMessage(paramsMessage).subscribe(
          (msg: any) => {
            if (this.idProject) {
              this.router.navigateByUrl("/client/projects/"+this.idProject+'/chat/'+el.data._id)
            } else {
              this.router.navigateByUrl("/client/chat/"+el.data._id)
            }
          }
        )
      }
    )
  }

  sendMessage() {
    let paramsMessage = {
      chat: this.chat._id,
      text: this.chatForm.value.htmlContent
    }
    this.chatSVC.newMessage(paramsMessage).subscribe(
      (msg: any) => {
        this.chatSVC.getChat(this.route.snapshot.paramMap.get('idChat')!).subscribe(
          (chat: any) => {
            this.chatForm.get('htmlContent')?.patchValue("")
            this.chat = chat.data;
          }
        )
      }
    )
  }

  setProject(pr: any) {
    if (pr.chats.length == 0) {
      this.router.navigateByUrl("/client/projects/"+pr._id+"/chat")
    }
    if (this.project == pr._id) {
      this.project = "";
      return;
    }
    this.project = pr._id;
  }

  getLength(chats: any) {
    return chats.filter((chat: any) => !chat.resolt).length
  }
}
