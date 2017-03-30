import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class DataService {
    private user: Object;
    private searchResult: any;

    constructor(private localStorageService: LocalStorageService){}

    storeUser(user: string) {
        sessionStorage.setItem("user", user)
    }
    
    getUser() {
        return JSON.parse(sessionStorage.getItem("user"));
    }

    storeCategories(categories: string) {
        sessionStorage.setItem("categories", categories)
    }

    getCategories() {
        return JSON.parse(sessionStorage.getItem("categories"));
    }
    storeSearch(searchedItems){
        this.searchResult = searchedItems;
    }
    getSearch(){
        return this.searchResult;
    }
}