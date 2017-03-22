import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestService {
    public user: any;

    constructor(private http: Http, private router: Router) { }

    signIn(username, password) {
        var body = `username=${username}&password=${password}`;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http
            .post('/signin', body, { headers: headers })
            .subscribe(response => {
                if (response.status === 200){
                    this.router.navigate(['/home', username]);
                    this.user = response.text();
                }
            })
    }

    registerRequest(email, username, password) {
        var body = `email=${email}&username=${username}&password=${password}`;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http
            .post('register', body, { headers: headers })
            .subscribe(response => {
                if (response.status === 200){
                    this.router.navigate(['/home', username]);
                }
            })
    }

}
