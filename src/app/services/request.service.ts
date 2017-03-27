import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { DataService } from './data.service';

@Injectable()
export class RequestService {
    private responseStatus: number;
    private responseText: string;
    private requestResponse: Object;

    constructor(private http: Http, private dataService: DataService) { }

    signIn(username, password, responseFunc) {
        var body = `username=${username}&password=${password}`;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http
            .post('/signin', body, { headers: headers })
            .subscribe(response => {
                this.responseStatus = response.status;
                this.responseText = response.text();
                responseFunc(this.responseStatus, this.responseText, username);
            }, error => {
                this.responseStatus = error.status;
                this.responseText = JSON.parse(error.text()).message;
                responseFunc(this.responseStatus, this.responseText, username);
            })
    }

    registerRequest(email, username, password, responseFunc) {
        var body = `email=${email}&username=${username}&password=${password}`;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http
            .post('register', body, { headers: headers })
            .subscribe(response => {
                this.responseStatus = response.status;
                this.responseText = response.text();
                responseFunc(this.responseStatus, this.responseText, username);
            }, error => {
                this.responseStatus = error.status;
                this.responseText = JSON.parse(error.text()).message;
                responseFunc(this.responseStatus, this.responseText, username);
            })
    }

    changeUserRequest(username, email, info, responseFunc) {
        var body = `email=${email}&info=${info}&username=${username}`;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http
            .put(`home/${username}`, body, { headers: headers })
            .subscribe(response => {
                this.responseStatus = response.status;
                this.responseText = response.text();
                responseFunc(this.responseStatus, this.responseText, username);
            }, error => {
                this.responseStatus = error.status;
                this.responseText = JSON.parse(error.text()).message;
                responseFunc(this.responseStatus, this.responseText, username);
            })
    }

    getCategories(responseFunc){
        return this.http.get('categories')
        .subscribe(response => {
            this.dataService.storeCategories(response.text()); 
            responseFunc();
        },
        error => {
            console.log("Error");
        })
    }

    getItems(category: string, responseFunc){
        this.http.get(`${category}/items`)
        .subscribe(response => {
            responseFunc(response.text());
        },
        error => {
            console.log("Error")
        }
        )
    }

}
