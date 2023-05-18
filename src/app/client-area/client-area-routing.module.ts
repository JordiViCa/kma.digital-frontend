import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { CompleteRegisterComponent } from './complete-register/complete-register.component';
import { LandingComponent } from './landing/landing.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { UserComponent } from './user/user.component';
import { WorkComponent } from './work/work.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    data: {
      nav: 'translate-x-[300%]'
    }
  },
  {
    path: 'completeRegister',
    component: CompleteRegisterComponent,
    data: {
      nav: 'translate-x-[300%]'
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
    path: 'projects',
    component: ProjectsComponent,
    data: {
      nav: 'translate-x-[100%]'
    }
  },
  {
    path: 'user',
    component: UserComponent,
    data: {
      nav: 'translate-x-[200%]'
    }
  },
  {
    path: 'projects/:idProject/edit',
    component: ProjectComponent,
    data: {
      nav: 'translate-x-[100%]',
      secondnav: 'translate-x-[200%]'
    },
  },
  {
    path: 'projects/:idProject/chat',
    component: ChatComponent,
    data: {
      nav: 'translate-x-[100%]',
      secondnav: 'translate-x-0'
    },
  },
  {
    path: 'projects/:idProject/chat/:idChat',
    component: ChatComponent,
    data: {
      nav: 'translate-x-[100%]',
      secondnav: 'translate-x-0'
    },
  },
  {
    path: 'projects/:idProject',
    component: WorkComponent,
    data: {
      nav: 'translate-x-[100%]',
      secondnav: 'translate-x-[100%]'
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
export class ClientAreaRoutingModule { }
