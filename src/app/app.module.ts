import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientAreaComponent } from './layouts/client-area/client-area.component';
import { PublicAreaComponent } from './layouts/public-area/public-area.component';
import { WorkAreaComponent } from './layouts/work-area/work-area.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientAreaComponent,
    PublicAreaComponent,
    WorkAreaComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
