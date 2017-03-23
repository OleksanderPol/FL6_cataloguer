import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
    private user: Object;

    constructor(){}

    storeUser(user: Object) {
        this.user = user;
    }
    
    getUser() {
        return this.user;
    }
}