import { Injectable } from '@angular/core';
import { Item } from '../item.model';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ItemsService {

  constructor(
    private http: Http
  ) { }

  getItems(itemsUrl): Promise<Object[]> {
    return this.http.get(itemsUrl)
               .toPromise()
               .then(response => {
                 JSON.parse(response.text())
               })
               .catch(this.handleError);
  }

  getByAlphabet(itemsUrl): Promise<Object[]> {
    return this.http.get(itemsUrl)
               .toPromise()
               .then(response => {
                 return JSON.parse(response.text())
               })
               .then(items => {
                  return items.sort((cell, nextCell) => {
                    return cell.name.localeCompare(nextCell.name);
                  });
               })
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
