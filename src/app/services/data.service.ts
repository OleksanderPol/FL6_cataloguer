import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class DataService {
    private user: Object;

    constructor(private localStorageService: LocalStorageService){}

    storeUser(user: string) {
        sessionStorage.setItem("user", user)
    }
    
    getUser() {
        return JSON.parse(sessionStorage.getItem("user"));
    }
}