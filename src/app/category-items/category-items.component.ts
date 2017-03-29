import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { User } from '../app.model';
import { Routes, Router, ActivatedRoute, Params } from '@angular/router';
import { TableNavigationService } from '../services/table-navigation.service';
import { Subscription } from 'rxjs/Subscription';
import { RequestService } from '../services/request.service';
import { MaterializeAction } from 'angular2-materialize';
import {Observable} from 'rxjs/Observable';

import { SearchPipe } from '../search/search.pipe';
import { FilterService } from '../services/filter.service';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.css']
})
export class CategoryItemsComponent implements OnInit {
  private pageTable: Object[] = [];
  private subscription: Subscription;
  private showNext: boolean;
  private showPrev: boolean;
  public items: Object[];
  public category: string;
  modalActions = new EventEmitter<string|MaterializeAction>();
  private searchPipe = new SearchPipe();

  constructor(
    private router: Router,
    private tableNavigationService: TableNavigationService,
    private requestService: RequestService,
    private activatedRoute: ActivatedRoute,
    private filterService: FilterService,
    private itemsService: ItemsService) {

    this.subscription = this.tableNavigationService.showNextChange.subscribe((value) => {
      this.showNext = value;
    });

    this.subscription = this.tableNavigationService.showPrevChange.subscribe((value) => {
      this.showPrev = value;
    });

    filterService.searchFilter$.subscribe(searchInput => {
      let filteredCategories = this.searchPipe.transform(this.itemsService.items, searchInput);
      this.pageTable = this.tableNavigationService.getFirstPage(filteredCategories);
    })
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
    this.category = params['category'];
    });
    this.requestService.getItems(this.category, this.getItemsData.bind(this));
    // this.itemsService
    //     .getItems(`${this.category}/items`)
    //     .then(result => this.getItemsData());

    this.itemsService.events$.forEach(event => {
      this.refresh();
    });
  }

  refresh() {
    this.pageTable = this.tableNavigationService.getFirstPage(this.itemsService.items);
    console.log('refresh');
  }

  getItemsData(items: string){
    this.items = JSON.parse(items);
    this.pageTable = this.tableNavigationService.getFirstPage(this.items);
    return this.pageTable;
  }

  getPrev(): Object[] {
    this.pageTable = this.tableNavigationService.getPrev(this.itemsService.items);
    return this.pageTable;
  }

  getNext(): Object[] {
    this.pageTable = this.tableNavigationService.getNext(this.itemsService.items);
    return this.pageTable;
  }

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }

  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
}
