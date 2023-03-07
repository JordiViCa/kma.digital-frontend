import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectAreaComponent } from '../layouts/project-area/project-area.component';
import { ChatComponent } from './chat/chat.component';
import { LandingComponent } from './landing/landing.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { UserComponent } from './user/user.component';
import { WorkComponent } from './work/work.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'project/{id}',
    component: ProjectAreaComponent,
    children: [
      {
        path: '',
        component: WorkComponent
      },
      {
        path: 'info',
        component: ProjectComponent,
      },
      {
        path: 'chat',
        component: ChatComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientAreaRoutingModule { }
