import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { User } from '../app.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GlobalSearchService {
    public foundItems;
    private subject = new Subject<string>();

    constructor(private http: Http) { }

    newEvent(event) {
        this.subject.next(event);
    }

    get events$() {
        return this.subject.asObservable();
    }

    findItems(url): Promise<Object> {
        return this.http.get(url)
            .toPromise()
            .then(response => {
                return this.foundItems = JSON.parse(response.text());
            })
            .catch(this.handleError);
    }
    private handleError(error: Error): Promise<Error> {
        return Promise.reject(error.message || error);
    }
}