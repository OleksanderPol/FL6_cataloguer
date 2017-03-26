import { Injectable, Input } from '@angular/core';
import { User } from '../app.model';
import { DataService } from '../services/data.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TableNavigationService {
    @Input() user: User;
    private pageTable: string[];
    public showNext: boolean;
    showNextChange = new BehaviorSubject<boolean>(true);
    public showPrev: boolean;
    showPrevChange = new BehaviorSubject<boolean>(false);
    private start: number = 0;
    private end: number = 8;

  constructor(private dataService: DataService) {
      
    this.user = this.dataService.getUser();
    this.user.categories = ['books','cars', 'cups', 'toys', 'phones',
                            'cards', 'coins', 'games', 'wathes', 'puzzles'] // fake, just to show rendered table
      
  }

    getFirstPage(data:string):string[] {
        if (this.user[data].length > this.end) {
            this.pageTable = this.user[data].slice(this.start, this.end)
            this.showNext = true;
            this.showNextChange.next(this.showNext);
        } else {
            this.pageTable = this.user[data];
        }
        return this.pageTable
    } 

    getNext(data:string):string[] {
      [this.start, this.end] = [this.end, this.end += 8];
      if (this.user[data].length > this.end) {
          this.end--;
      }
      if (this.user[data].length <= this.end){
          this.showNext = false;
          this.showNextChange.next(this.showNext);
      }
      this.showPrev = true;
      this.showPrevChange.next(this.showPrev);
      this.pageTable = this.user[data].slice(this.start, this.end);
      return this.pageTable;
    }

    getPrev(data:string):string[] {
      [this.end, this.start] = [this.start, this.start -= 8];
      if (this.start === 0) {
          this.showPrev =false;
          this.showPrevChange.next(this.showPrev);
      }      
      if (this.start > 0) {
          this.start++;
      }
      this.showNext = true;
      this.showNextChange.next(this.showNext);
      this.pageTable = this.user[data].slice(this.start, this.end);
      return this.pageTable;
    }
}
