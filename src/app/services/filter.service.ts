import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class FilterService {
    private searchFilter = new Subject<string>();

    searchFilter$ = this.searchFilter.asObservable();

    addSearchPhrase(searchInput: string){
        this.searchFilter.next(searchInput);
    }
}

