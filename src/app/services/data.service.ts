import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
// import { User } from '../app.model';

@Injectable()
export class DataService {
  private user: Object;

  constructor(private localStorageService: LocalStorageService){}

  storeUser(user: string) {
    localStorage.setItem("user", user)
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  removeUser(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("logedInUser");
  }

  storeCategories(categories: string) {
    localStorage.setItem("categories", categories)
  }

  getCategories() {
    return JSON.parse(localStorage.getItem("categories"));
  }
  storeLogedInUser(user: string){
    localStorage.setItem("logedInUser", user);
  }
  getLogedInUser(){
    return JSON.parse(localStorage.getItem("logedInUser"));
  }
}
