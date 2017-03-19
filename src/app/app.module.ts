import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';

import { ControlMessagesComponent } from './control-messages.component';
import { ValidationService } from './services/validation.service';
import { RequestService } from './services/request.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { StartingPageComponent } from './starting-page/starting-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ControlMessagesComponent,
    HomeComponent,
    StartingPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [ValidationService, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
