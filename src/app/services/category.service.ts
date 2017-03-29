import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Category } from '../app.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {
  public categories: Category[];
  private subject = new Subject<any>();

  constructor(
    private http: Http
  ) { }

  newEvent(event) {
    this.subject.next(event);
  }

  get events$() {
    return this.subject.asObservable();
  }

  getCategories(): Category[] {
    console.log('in service');
    return this.categories;
  }

  getHttpCategories(categoriesUrl): Promise<Category[]> {
    return this.http.get(categoriesUrl)
               .toPromise()
               .then(response => {
                 return this.categories = JSON.parse(response.text());
               })
               .catch(this.handleError);
  }

  sortByAlphabet(): void {
    this.categories.sort((cat: Category, nextCat: Category) => {
      return cat.name.localeCompare(nextCat.name);
    });
  }

  sortByAmountOfItems(): void {
    this.categories.sort((cat: Category, nextCat: Category) => {
      return nextCat.amountOfItems - cat.amountOfItems;
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
