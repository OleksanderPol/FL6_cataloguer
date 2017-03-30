import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';

import { User } from '../app.model';
import { Routes, Router, ActivatedRoute, Params, NavigationStart } from '@angular/router';
import { TableNavigationService } from '../services/table-navigation.service';
import { Subscription } from 'rxjs/Subscription';
import { RequestService } from '../services/request.service';
import { MaterializeAction } from 'angular2-materialize';
import { Observable } from 'rxjs/Observable';

import { SearchPipe } from '../search/search.pipe';
import { FilterService } from '../services/filter.service';


@Component({
  selector: 'app-global-search-items',
  templateUrl: './global-search-items.component.html',
  styleUrls: ['./global-search-items.component.css']
})
export class GlobalSearchItemsComponent implements OnInit {
  public searchedUser: Object = {
    username: "",
    email: ""
  };
  private items: any;
  private pageTable: Object[] = [];
  private subscription: Subscription;
  private showNext: boolean;
  private showPrev: boolean;
  public category: string;
  modalActions = new EventEmitter<string | MaterializeAction>();
  private searchPipe = new SearchPipe();
  private ifItem: boolean = false;

  constructor(private dataService: DataService,
    private router: Router,
    private tableNavigationService: TableNavigationService,
    private requestService: RequestService,
    private activatedRoute: ActivatedRoute,
    private filterService: FilterService) {

    this.subscription = this.tableNavigationService.showNextChange.subscribe((value) => {
      this.showNext = value;
    });

    this.subscription = this.tableNavigationService.showPrevChange.subscribe((value) => {
      this.showPrev = value;
    });

    filterService.searchFilter$.subscribe(searchInput => {
      let filteredCategories = this.searchPipe.transform(this.items, searchInput);
      this.pageTable = this.tableNavigationService.getFirstPage(filteredCategories);
      return this.pageTable;
    });

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.items = JSON.parse(this.dataService.getSearch());
        this.pageTable = this.tableNavigationService.getFirstPage(this.items);
        return this.pageTable;
      }
    })

  }

  ngOnInit() {
    this.items = JSON.parse(this.dataService.getSearch());
    this.ifItem = true;
    this.pageTable = this.tableNavigationService.getFirstPage(this.items);
    return this.pageTable;
  }

  getPrev(): Object[] {
    this.pageTable = this.tableNavigationService.getPrev(this.items);
    return this.pageTable;
  }

  getNext(): Object[] {
    this.pageTable = this.tableNavigationService.getNext(this.items);
    return this.pageTable;
  }

  openModalRequest(id){
    this.modalActions.emit({ action: "modal", params: ['open'] });
    this.requestService.itemsUser(id, this.getUserData.bind(this));
  }

  getUserData(foundUser){
    this.searchedUser = JSON.parse(foundUser);
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
}
