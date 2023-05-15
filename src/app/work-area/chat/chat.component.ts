import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ChatService } from 'src/app/services/chat.service';
import { DashboardService } from 'src/app/services/dashboard.service';
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
  deleteChat: boolean = false;
  showConfig: boolean = false;

  search: any = setTimeout(() => {}, 0);

  projectSelected: any;
  projectsUpdate: any;
  projectUpdate: any;


  newChatForm: FormGroup = this.formBuilder.group({
    title: ["",[Validators.required, Validators.maxLength(40)]],
    htmlContent: ["",[Validators.required]]
  });;

  chatUpdateForm: FormGroup = this.formBuilder.group({
    title: ["",[Validators.required, Validators.maxLength(40)]],
    project: [""]
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
          let chats = el.data.sort((a: any, b: any) => {
            console.log("a",a)
            console.log("b",b)
            return (a.resolt === b.resolt)? 0 : a.resolt? 1 : -1;
          });;
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
          this.chatSVC.getAllChats().subscribe(
            (chat: any) => {
              console.log("Chats",chat)
              this.projects.map(
                (pr: any) => {
                  console.log("Projects",pr)
                  pr.chats = [];
                  chat.data.forEach(
                    (chat: any) => {
                      if (chat.project && chat.project._id == pr._id) {
                        pr.chats.push(chat)
                      }
                    }
                  )
                  return pr;
                }
              )
              console.log("Projects",this.projects)
              let noProject = chat.data.filter(
                (chat: any) => {
                  if (!chat.project) {
                    return chat
                  }
                }
              )
              console.log("No Project",noProject)
              if (noProject.length != 0) {
                this.projects.push({
                  name: 'No project',
                  chats: noProject,
                  _id: 'noProject'
                })
              }
            }
          )
        }
      )
    }
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('idChat')) {
      this.chatSVC.getChat(this.route.snapshot.paramMap.get('idChat')!).subscribe(
        (chat: any) => {
          this.chat = chat.data;
          console.log(chat)
          this.chatUpdateForm.patchValue({
            title: chat.data.titol
          })
          this.toggleViewChats = true;
          this.userSVC.getActualUser().subscribe(
            (user: any) => {
              this.userId = user.data._id;
              this.chat.messages.forEach(
                (message: any) => {
                  console.log(message.sender._id, this.userId)
                  if (message.sender._id != this.userId && !message.seenDate) {
                    this.chatSVC.markAsRead(message._id).subscribe(
                      (message: any) => {
                        console.log(message)
                      }
                    )
                  }
                }
              )
            }
          )
        }
      )
    }
    this.chatUpdateForm.get("project")?.valueChanges.subscribe(
      (value: any) => {
        clearTimeout(this.search)
        this.search = setTimeout(() => {
          if (!this.projectSelected && value != "") {
            this.projectSVC.searchFiveProjects(value).subscribe(
              (el: any) => {
                this.projectsUpdate = el.data;
              }
            )
          }
        }, 1000)
      }
    );
  }

  getValue(pr: any) {
    return pr;
  }

  getH(pr: any) {
    return "max-height: " + pr.length*32 + "px;";
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
              this.router.navigateByUrl("/work/projects/"+this.idProject+'/chat/'+el.data._id)
            } else {
              this.router.navigateByUrl("/work/chat/"+el.data._id)
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
            this.chat = chat.data;
          }
        )
      }
    )
  }

  setProject(pr: any) {
    if (pr.chats.length == 0) {
      this.router.navigateByUrl("/work/projects/"+pr._id+"/chat")
    }
    if (this.project == pr._id) {
      this.project = "";
      return;
    }
    this.project = pr._id;
  }

  closePopup(event: any, close: any) {
    if (event.target.id == 'closeConfirmation') {
      this.unselectproject()
      if (close == "deleteChat") {
        this.deleteChat = !this.deleteChat;
      } else {
        this.showConfig = !this.showConfig;
      }
    }
  }

  resolveChat() {
    this.chatSVC.resolveChat(this.chat._id).subscribe(
      (el: any) => {
        if (this.idProject) {
          this.router.navigateByUrl('/work/projects/'+this.idProject+"/chat")
        } else {
          this.router.navigateByUrl('/work/projects')
        }
      }
    )
  }

  selectproject(project: any) {
    this.projectSelected = true;
    this.projectUpdate = project;
    console.log(this.project)
    this.chatUpdateForm.get("project")?.patchValue(project.name + " - " + project.client.name + " " + project.client.surname);
    this.chatUpdateForm.get("project")?.disable();
  }

  unselectproject() {
    this.projectsUpdate = [];
    this.projectUpdate = {};
    this.projectSelected = false;
    this.chatUpdateForm.get("project")?.patchValue('');
    this.chatUpdateForm.get("project")?.markAsUntouched();
    this.chatUpdateForm.get("project")?.enable();
  }

  saveUpdate() {
    if (this.chatUpdateForm.invalid) {
      this.chatUpdateForm.markAllAsTouched();
      return;
    }
    let params: any = {
      title: this.chatUpdateForm.value.title,
      client: this.projectUpdate ? this.projectUpdate.client._id : this.chat.client,
      project: this.projectUpdate ? this.projectUpdate._id : this.chat.project._id
    };
    this.chatSVC.updateChat(params,this.chat._id).subscribe(
      (el: any) => {
        console.log("UpdateChat",el)
        if (!el) {
          return;
        }
        if (!this.chat.project) {
          this.router.navigate(["/work/projects/"+this.projectUpdate._id+"/chat/"+this.chat._id])
          return;
        }
        if (this.projectUpdate && this.chat.project._id != this.projectUpdate._id) {
          this.router.navigate(["/work/projects/"+this.idProject+"/chat"])
          return;
        }
        this.showConfig = !this.showConfig;
        this.chat.titol = this.chatUpdateForm.value.title
      }
    )
  }

  getLength(chats: any) {
    return chats.filter((chat: any) => !chat.resolt).length
  }
}
