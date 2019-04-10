import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { ChartsModule} from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { RenderMapComponent } from './render-map/render-map.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportComponent,
    RenderMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
