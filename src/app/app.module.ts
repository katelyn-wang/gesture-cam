import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiComponent } from './ui/ui.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HandtrackerComponent } from './handtracker/handtracker.component';
import { ViewPageComponent } from './pages/view-page/view-page.component';
import { WebcamModule } from 'ngx-webcam';
import { PhotoComponent } from './components/photo/photo.component';
import { PhotoCarouselComponent } from './components/photo-carousel/photo-carousel.component';


@NgModule({
  declarations: [
    AppComponent,
    UiComponent,
    HomePageComponent,
    ViewPageComponent,
    HandtrackerComponent,
    ViewPageComponent,
    PhotoComponent,
    PhotoCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
