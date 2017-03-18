import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';

import { ControlMessagesComponent } from './control-messages.component';
import { ValidationService } from './validation.service';
import { RequestService } from './request.service';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    ControlMessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    ReactiveFormsModule,
  ],
  providers: [ValidationService, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
