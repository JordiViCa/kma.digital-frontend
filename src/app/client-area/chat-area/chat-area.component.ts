import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss'],
})
export class ChatAreaComponent  implements OnInit {

  @Input() chat: any;
  @Input() toggleViewChats: boolean = false;
  @Output() sendMSG: EventEmitter<any> = new EventEmitter;


  chatForm: FormGroup;
  userId: string = "";
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
    private formBuilder: FormBuilder,
    private userSVC: UserService
  ) {
    this.userSVC.getActualUser().subscribe(
      (user: any) => {
        this.userId = user._id;
      }
    )
    this.chatForm = this.formBuilder.group({
      htmlContent: ["",[Validators.required]]
    });
  }

  ngOnInit() {}

  sendMessage() {
    if (this.chatForm.valid) {
      this.sendMSG.emit(this.chatForm.value.htmlContent)
    }
  }

}
