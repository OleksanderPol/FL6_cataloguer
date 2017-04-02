import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
// import { User } from '../app.model';

@Injectable()
export class DataService {
  private user: Object;
  private searchResult: any;
  private clubUsers: any;

  constructor(private localStorageService: LocalStorageService){}

  storeUser(user: string) {
    sessionStorage.setItem("user", user)
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem("user"));
  }

  removeUser(): void {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("logedInUser");
  }

  storeCategories(categories: string) {
    sessionStorage.setItem("categories", categories)
  }

  getCategories() {
    return JSON.parse(sessionStorage.getItem("categories"));
  }

  storeSearch(searchedItems) {
    this.searchResult = searchedItems;
  }

  getSearch() {
    return this.searchResult;
  }
  storeClubUsers(users){
    this.clubUsers = users;
  }
  getClubUsers(){
    return JSON.parse(this.clubUsers);
  }
  storeLogedInUserId(id: string){
    sessionStorage.setItem("logedInUser", id);
  }
  getLogedInUserId(){
    return sessionStorage.getItem("logedInUser");
  }
}
