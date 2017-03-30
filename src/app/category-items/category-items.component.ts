import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { User } from '../app.model';
import { Routes, Router, ActivatedRoute, Params } from '@angular/router';
import { TableNavigationService } from '../services/table-navigation.service';
import { Subscription } from 'rxjs/Subscription';
import { RequestService } from '../services/request.service';
import { MaterializeAction } from 'angular2-materialize';
import {Observable} from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
  public category: string;
  public modalActions = [];
  public itemForm: FormGroup;
  public changeError: string;
  public ratingNum: number[] = [1,2,3,4,5];
  private searchPipe = new SearchPipe();

  constructor(
    private router: Router,
    private tableNavigationService: TableNavigationService,
    private requestService: RequestService,
    private activatedRoute: ActivatedRoute,
    private filterService: FilterService,
    private itemsService: ItemsService,
    private formBuilder: FormBuilder) {

    this.itemForm = this.formBuilder.group({
      'itemName': ['', Validators.required],
      'itemInfo': ['', Validators.required]
    });        
      
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

    this.itemsService
        .getItems(`${this.category}/items`)
        .then(result => this.getItemsData());

    this.itemsService.events$.forEach(event => {
      this.refresh();
    });
    this.createModals(9);    
  }
  createModals(num) {
    this.modalActions = [];
    for (let i = 0; i < num; i++) {
        this.modalActions.push(new EventEmitter<string|MaterializeAction>())
    }
  }
  refresh() {
    this.pageTable = this.tableNavigationService.getFirstPage(this.itemsService.items);
    this.createModals(this.pageTable.length);
    return this.pageTable;
  }

  getItemsData(){
    this.pageTable = this.tableNavigationService.getFirstPage(this.itemsService.items);
    return this.pageTable;
  }

  getPrev(): Object[] {
    this.pageTable = this.tableNavigationService.getPrev(this.itemsService.items);
    this.createModals(this.pageTable.length);
    return this.pageTable;
  }

  getNext(): Object[] {
    this.pageTable = this.tableNavigationService.getNext(this.itemsService.items);
    this.createModals(this.pageTable.length);
    return this.pageTable;
  }

  openModal(i) {
    this.modalActions[i].emit({action:"modal",params:['open']});
  }
  closeModal(i) {
    this.modalActions[i].emit({action:"modal",params:['close']});
  }
    
  deleteItem(event, id) {
   event.stopPropagation();
//   this.requestService.deleteItem(id);
   this.refresh();
   console.log('deleted')
  }
  changeItemInfo(id) {
    if (this.itemForm.dirty && this.itemForm.valid) {
      this.requestService.changeItemInfo(id, this.itemForm, this.receiveResponseChange.bind(this));
    }
  }
  changeItemRating(changed, id, ratingNum) {
    if (changed) {
      this.requestService.changeItemRating(id, ratingNum, this.receiveResponseChange.bind(this));
      this.itemForm.reset();
    }
  }
  receiveResponseChange(status, response, id) {
    if (status === 200) {
        this.refresh();
    } else {
      this.changeError = response;
    }
  }
}
