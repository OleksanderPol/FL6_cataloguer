import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Category } from '../app.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AllUsersCategoriesService {
  public allUsersCategories;
  private subject = new Subject<string>();

  constructor(private http: Http) {}

  newEvent(event) {
    this.subject.next(event);
  }

  get events$() {
    return this.subject.asObservable();
  }
  
  getAllUsersCategories(): Promise<Object>{
      return this.http.get('/allcategories')
        .toPromise()
        .then(response => {
            return this.allUsersCategories = JSON.parse(response.text());
        })
        .catch(this.handleError);
  }  

  sortByAlphabet(): void {
    this.allUsersCategories.sort((cat, nextCat) => {
      return cat.name.localeCompare(nextCat.name);
    });
  }
  
  sortByAmountOfUsers():void {
    this.allUsersCategories.sort((cur, next) => {
       return next.users.length - cur.users.length;
    })
  }

  private handleError(error: Error): Promise<Error> {
    return Promise.reject(error.message || error);
  }
    
}

