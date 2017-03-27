import { Injectable, Input } from '@angular/core';
import { User } from '../app.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TableNavigationService {
    @Input() user: User;
    private pageTable: Object[];
    public showNext: boolean;
    showNextChange = new BehaviorSubject<boolean>(true);
    public showPrev: boolean;
    showPrevChange = new BehaviorSubject<boolean>(false);
    private start: number = 0;
    private end: number = 8;

  constructor() {}
      
    getFirstPage(data: Array<Object>):Object[] {
        if (data.length > this.end) {
            this.pageTable = data.slice(this.start, this.end)
            this.showNext = true;
            this.showNextChange.next(this.showNext);
        } else {
            this.pageTable = data;
            this.showNext = false;
            this.showNextChange.next(this.showNext);
        }
        return this.pageTable
    } 

    getNext(data: Array<Object>):Object[] {
      [this.start, this.end] = [this.end, this.end += 8];
      if (data.length > this.end) {
          this.end--;
      }
      if (data.length <= this.end){
          this.showNext = false;
          this.showNextChange.next(this.showNext);
      }
      this.showPrev = true;
      this.showPrevChange.next(this.showPrev);
      this.pageTable = data.slice(this.start, this.end);
      return this.pageTable;
    }

    getPrev(data: Array<Object>):Object[] {
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
      this.pageTable = data.slice(this.start, this.end);
      return this.pageTable;
    }

}