import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../app.model';

@Injectable()
export class RequestService {
    private responseStatus: number;
    private responseText: string;
    private requestResponse: Object;

    constructor(private http: Http) { }

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

}
