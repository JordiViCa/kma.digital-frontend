import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AffiliatesComponent } from './affiliates/affiliates.component';
import { ContactComponent } from './contact/contact.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: "",
    component: LandingComponent,
    data: {
      nav: 'translate-x-[400%]'
    }
  },
  {
    path: "affiliates",
    component: AffiliatesComponent,
    data: {
      nav: 'translate-x-0'
    }
  },
  {
    path: "about",
    component: AboutUsComponent,
    data: {
      nav: 'translate-x-[100%]'
    }
  },
  {
    path: "contact",
    component: ContactComponent,
    data: {
      nav: 'translate-x-[200%]'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicAreaRoutingModule { }
