import { Injectable } from '@angular/core';
import { Item } from '../item.model';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ItemsService {
  private items: Item[];

  constructor(
    private http: Http
  ) { }

  getItems(itemsUrl): Promise<Item[]> {
    return this.http.get(itemsUrl)
               .toPromise()
               .then(response => {
                 return this.items = JSON.parse(response.text());
               })
               .catch(this.handleError);
  }

  getByAlphabet(): Item[] {
    return this.items.sort((item: Item, nextItem: Item) => {
      return item.name.localeCompare(nextItem.name);
    });
  }

  getByRating(): Item[] {
    return this.items.sort((item: Item, nextItem: Item) => {
      return nextItem.rating - item.rating;
    });
  }

  getByDate(indicator: string): Item[] {
    if (indicator === '+') {
      return this.items.sort((item: Item, nextItem: Item) => {
        return new Date(nextItem.created).getTime() - new Date(item.created).getTime();
      });
    }

    return this.items.sort((item: Item, nextItem: Item) => {
      return new Date(item.created).getTime() - new Date(nextItem.created).getTime();
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
