import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientAreaRoutingModule } from './client-area-routing.module';
import { ChatComponent } from './chat/chat.component';
import { LandingComponent } from './landing/landing.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { UserComponent } from './user/user.component';
import { WorkComponent } from './work/work.component';
import { CompleteRegisterComponent } from './complete-register/complete-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { TaskComponent } from './task/task.component';



@NgModule({
  declarations: [
    ChatComponent,
    LandingComponent,
    ProjectComponent,
    ProjectsComponent,
    UserComponent,
    WorkComponent,
    CompleteRegisterComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    ClientAreaRoutingModule,
    ReactiveFormsModule,
    AngularEditorModule,
    SharedPipesModule,
    FormsModule
  ]
})
export class ClientAreaModule { }
