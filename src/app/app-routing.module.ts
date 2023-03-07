import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ClientAreaComponent } from './layouts/client-area/client-area.component';
import { PublicAreaComponent } from './layouts/public-area/public-area.component';
import { WorkAreaComponent } from './layouts/work-area/work-area.component';

const routes: Routes = [
  {
    path: "",
    component: PublicAreaComponent,
    loadChildren: () => import('./public-area/public-area.module').then( m => m.PublicAreaModule)
  },
  {
    path: "client",
    component: ClientAreaComponent,
    loadChildren: () => import('./client-area/client-area.module').then( m => m.ClientAreaModule)
  },
  {
    path: "work",
    component: WorkAreaComponent,
    loadChildren: () => import('./work-area/work-area.module').then( m => m.WorkAreaModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
