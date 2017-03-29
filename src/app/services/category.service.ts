import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Category } from '../app.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {
  private categories: Category[];

  constructor(
    private http: Http
  ) { }

  ngOnInit() {

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
      return cat.amountOfItems - nextCat.amountOfItems;
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
