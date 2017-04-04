import { Injectable } from '@angular/core';
import { Item } from '../app.model';
import { Headers, Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ItemsService {
  public items: Item[];
  private subject = new Subject<string>();
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http
  ) { }

  newEvent(event) {
    this.subject.next(event);
  }

  get events$() {
    return this.subject.asObservable();
  }

  getItems(itemsUrl): Promise<Item[]> {
    return this.http.get(itemsUrl)
               .toPromise()
               .then(response => {
                  return this.items = JSON.parse(response.text());
               })
               .catch(this.handleError);
  }

  addItem(
    name: string,
    info: string,
    fotoUrl: string,
    category: string,
    userId: string): Promise<string> {

    let itemObj: Item = {
      name: name,
      info: info,
      fotoUrl: fotoUrl,
      created: new Date(),
      rating: 0,
      borrowedTo: ''
    }

    return this.http
      .post(`${category}/items`, JSON.stringify(itemObj), {headers: this.headers})
      .toPromise()
      .then(res => {
        if (res.status === 200) {
          this.getItems(`${userId}/${category}/items`)
            .then(res => {
              this.newEvent('add');
            });
        } else {
          return 'Server error';
        }
      })
      .catch(this.handleError);
  }

  removeItem(id: string, name: string): Promise<string> {
    return this.http
      .delete(`/items/${id}`)
      .toPromise()
      .then(res => {
        if (res.status === 200) {
          let itemIndex = this.items.findIndex(item => {
            return item.name === name;
          });
          this.items.splice(itemIndex, 1);
          this.newEvent('remove');
        } else {
          return 'Server error';
        }
      })
      .catch(this.handleError);
  }

  checkItem(itemName: string): boolean {
    if (this.items.map(item => item.name.toUpperCase()).indexOf(itemName) + 1) {
      return false;
    }

    return true;
  }

  sortByAlphabet(): void {
    this.items.sort((item: Item, nextItem: Item) => {
      return item.name.localeCompare(nextItem.name);
    });
  }

  sortByRating(): void {
    this.items.sort((item: Item, nextItem: Item) => {
      return nextItem.rating - item.rating;
    });
  }

  sortByDate(indicator: string): void {
    if (indicator === '+') {
      this.items.sort((item: Item, nextItem: Item) => {
        return new Date(nextItem.created).getTime() - new Date(item.created).getTime();
      });

      return;
    }

    this.items.sort((item: Item, nextItem: Item) => {
      return new Date(item.created).getTime() - new Date(nextItem.created).getTime();
    });
  }

  private handleError(error: Error): Promise<Error> {
    return Promise.reject(error.message || error);
  }
}
