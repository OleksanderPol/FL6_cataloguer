import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestService {

    constructor(private http: Http, private router: Router) { }

    signIn(username, password) {
        var body = `username=${username}&password=${password}`;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http
            .post('http://requestb.in/1impvyj1', body, { headers: headers })
            .subscribe(response => {
                if (response.status === 200){
                    this.router.navigate(['/home', username]);
                }
            })
    }
}