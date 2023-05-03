import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientAreaRoutingModule } from './client-area-routing.module';
import { ChatComponent } from './chat/chat.component';
import { LandingComponent } from './landing/landing.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { UserComponent } from './user/user.component';
import { WorkComponent } from './work/work.component';
import { ProjectAreaComponent } from '../layouts/project-area/project-area.component';
import { CompleteRegisterComponent } from './complete-register/complete-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ChatsComponent } from './chats/chats.component';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { ChatSelectorComponent } from './chat-selector/chat-selector.component';



@NgModule({
  declarations: [
    ChatComponent,
    LandingComponent,
    ProjectComponent,
    ProjectsComponent,
    UserComponent,
    WorkComponent,
    ProjectAreaComponent,
    CompleteRegisterComponent,
    ChatsComponent,
    ChatAreaComponent,
    ChatSelectorComponent,
  ],
  imports: [
    CommonModule,
    ClientAreaRoutingModule,
    ReactiveFormsModule,
    AngularEditorModule
  ]
})
export class ClientAreaModule { }
