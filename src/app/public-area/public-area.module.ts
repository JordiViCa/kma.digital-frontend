import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us/about-us.component';
import { AffiliatesComponent } from './affiliates/affiliates.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PublicAreaRoutingModule } from './public-area-routing.module';



@NgModule({
  declarations: [
    AboutUsComponent,
    AffiliatesComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    PublicAreaRoutingModule
  ]
})
export class PublicAreaModule { }
