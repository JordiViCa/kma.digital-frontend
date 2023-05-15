import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ChatsComponent } from './chats/chats.component';
import { CompleteRegisterComponent } from './complete-register/complete-register.component';
import { LandingComponent } from './landing/landing.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { UserComponent } from './user/user.component';
import { WorkComponent } from './work/work.component';

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
    path: 'chat/:idchat',
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
    path: 'projects/:id',
    data: {
      nav: 'translate-x-[100%]'
    },
    children: [
      {
        path: '',
        component: WorkComponent,
        data: {
          nav: 'translate-x-[100%]'
        },
      },
      {
        path: 'info',
        component: ProjectComponent,
        data: {
          nav: 'translate-x-[100%]'
        },
      },
      {
        path: 'chats',
        component: ChatComponent,
        data: {
          nav: 'translate-x-[100%]'
        },
      },
      {
        path: 'chats/:idchat',
        component: ChatComponent,
        data: {
          nav: 'translate-x-[100%]'
        },
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientAreaRoutingModule { }
