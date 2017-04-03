import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Category } from '../app.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {
  public categories: Category[];
  public allUsersCategories: any;
  private subject = new Subject<string>();
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http
  ) {}

  onInit(url) {
    this.getHttpCategories(url)
      .then(res => {
        this.newEvent('getCategories');
      });
  }

  newEvent(event) {
    this.subject.next(event);
  }

  get events$() {
    return this.subject.asObservable();
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

  checkCategory(categoryName: string): boolean {
    if (this.categories.map(category => category.name.toUpperCase()).indexOf(categoryName) + 1) {
      return false;
    }

    return true;
  }

  addCategory(categoryName: string): Promise<string> {
    return this.http
      .post('categories', JSON.stringify({name: categoryName}), {headers: this.headers})
      .toPromise()
      .then(res => {
        if (res.status === 200) {
          this.categories.push({name: categoryName, amountOfItems: 0});
          this.newEvent('addCategory');
        } else {
          return 'Not saved in db';
        }
      })
      .catch(this.handleError);
  }

  removeCategory(categoryName: string): Promise<string> {
    return this.http
      .delete(`/categories/${categoryName}`)
      .toPromise()
      .then(res => {
        if (res.status === 200) {
          let catIndex = this.categories.findIndex(category => {
            return category.name === categoryName;
          });
          this.categories.splice(catIndex, 1);
          this.newEvent('deleteCategory');
        } else {
          return 'Cant delete category'
        }
      })
      .catch(this.handleError)
  }

  private handleError(error: Error): Promise<Error> {
    return Promise.reject(error.message || error);
  }
}
