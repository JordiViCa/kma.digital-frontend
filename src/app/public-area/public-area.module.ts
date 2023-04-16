import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us/about-us.component';
import { AffiliatesComponent } from './affiliates/affiliates.component';
import { LandingComponent } from './landing/landing.component';
import { PublicAreaRoutingModule } from './public-area-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    AboutUsComponent,
    AffiliatesComponent,
    LandingComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    PublicAreaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PublicAreaModule { }
