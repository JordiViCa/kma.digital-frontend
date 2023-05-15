import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ProjectsComponent } from './projects/projects.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';
import { ChatComponent } from './chat/chat.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    data: {
      nav: 'translate-x-[300%]'
    }
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: {
      nav: 'translate-x-[100%]'
    }
  },
  {
    path: 'chat',
    component: ChatComponent,
    data: {
      nav: 'translate-x-0'
    }
  },
  {
    path: 'chat/:idChat',
    component: ChatComponent,
    data: {
      nav: 'translate-x-0'
    }
  },
  {
    path: 'projects/:idProject/edit',
    component: ProjectComponent,
    data: {
      nav: 'translate-x-[200%]',
      secondnav: 'translate-x-[400%]'
    },
  },
  {
    path: 'projects/:idProject/chat',
    component: ChatComponent,
    data: {
      nav: 'translate-x-0',
      secondnav: 'translate-x-[400%]'
    },
  },
  {
    path: 'projects/:idProject/chat/:idChat',
    component: ChatComponent,
    data: {
      nav: 'translate-x-0',
      secondnav: 'translate-x-[400%]'
    },
  },
  {
    path: 'projects/:idProject',
    component: DashboardComponent,
    data: {
      nav: 'translate-x-[100%]',
      secondnav: 'translate-x-[400%]'
    },
    children: [
      {
        path: ':idTask',
        component: TaskComponent,
        data: {
          nav: 'translate-x-[100%]',
          secondnav: 'translate-x-[400%]'
        },
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkAreaRoutingModule { }
