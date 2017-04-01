import { Injectable, Input } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TableNavigationService {
    private pageTable: Object[];
    public showNext: boolean;
    showNextChange = new BehaviorSubject<boolean>(false);
    public showPrev: boolean;
    showPrevChange = new BehaviorSubject<boolean>(false);
    private start: number = 0;
    private end: number = 9;

  constructor() {}
      
    getPage(data: Array<Object>, navDirection: string):Object[] {
        if (navDirection === 'first' && data.length > this.end) {         
            this.showNext = true;
            this.showNextChange.next(this.showNext);
        } else if (navDirection === 'first') {
            this.showNext = false;
            this.showNextChange.next(this.showNext);
        }
        if (navDirection === 'next' && (data.length - 9) > this.end) {
            this.start += 9;
            this.end += 9;
            this.showPrev = true;
            this.showPrevChange.next(this.showPrev);
        } else if (navDirection === 'next') {
            this.start += 9;
            this.end += 9;
            this.showPrev = true;
            this.showPrevChange.next(this.showPrev);
            this.showNext = false;
            this.showNextChange.next(this.showNext);
        }
        if (navDirection === 'prev' && this.start === 9) {
            this.start -= 9;
            this.end -= 9;
            this.showNext = true;
            this.showNextChange.next(this.showNext);
            this.showPrev = false;
            this.showPrevChange.next(this.showPrev);
        } else if (navDirection === 'prev') {
            this.start -= 9;
            this.end -= 9;
            this.showNext = true;
            this.showNextChange.next(this.showNext);
        }
        this.pageTable = data.slice(this.start, this.end);
        return this.pageTable
    } 
}