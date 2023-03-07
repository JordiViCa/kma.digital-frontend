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



@NgModule({
  declarations: [
    ChatComponent,
    LandingComponent,
    ProjectComponent,
    ProjectsComponent,
    UserComponent,
    WorkComponent,
    ProjectAreaComponent
  ],
  imports: [
    CommonModule,
    ClientAreaRoutingModule
  ]
})
export class ClientAreaModule { }
