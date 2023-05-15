import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkAreaRoutingModule } from './work-area-routing.module';
import { LandingComponent } from './landing/landing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectComponent } from './project/project.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatComponent } from './chat/chat.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskComponent } from './task/task.component';
import { SharedPipesModule } from '../pipes/shared-pipes.module';


@NgModule({
  declarations: [
    LandingComponent,
    ProjectsComponent,
    CreateProjectComponent,
    ProjectComponent,
    DashboardComponent,
    ChatComponent,
    CreateCategoryComponent,
    CreateTaskComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    WorkAreaRoutingModule,
    ReactiveFormsModule,
    AngularEditorModule,
    SharedPipesModule,
    FormsModule
  ]
})
export class WorkAreaModule { }
