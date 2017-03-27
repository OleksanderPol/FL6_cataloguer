import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';
import { LocalStorageModule } from 'angular-2-local-storage';

import { ControlMessagesComponent } from './control-messages.component';

import { ValidationService } from './services/validation.service';
import { DataService } from './services/data.service';
import { RequestService } from './services/request.service';
import { ItemsService } from './services/items.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { StartingPageComponent } from './starting-page/starting-page.component';
import { GoogleSigninComponent } from './google-signin/google-signin.component';
import { ProfileComponent } from './profile/profile.component';

import { NavigationComponent } from './navigation/navigation.component';

import { CategoriesComponent } from './categories/categories.component';
import { TableNavigationService } from './services/table-navigation.service';

@NgModule({
  declarations: [
    AppComponent,
    ControlMessagesComponent,
    HomeComponent,

    StartingPageComponent,
    GoogleSigninComponent,
    ProfileComponent,

    NavigationComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    ReactiveFormsModule,
    routing,
    LocalStorageModule.withConfig({
            prefix: 'my-app',
        //  storageType: 'localStorage'
            storageType: 'sessionStorage'})
  ],
  providers: [ValidationService, RequestService, DataService, ItemsService, TableNavigationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
