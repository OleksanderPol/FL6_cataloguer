import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { User, NotLogedInUser } from '../app.model';
import { Routes, Router, ActivatedRoute, Params } from '@angular/router';
import { TableNavigationService } from '../services/table-navigation.service';
import { Subscription } from 'rxjs/Subscription';
import { RequestService } from '../services/request.service';
import { DataService } from '../services/data.service';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

import { SearchPipe } from '../search/search.pipe';
import { FilterService } from '../services/filter.service';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.css']
})
export class CategoryItemsComponent implements OnInit {
  private logedInUser: User;
  private pageTable: Object[] = [];
  private subscription: Subscription;
  private showNext: boolean;
  private showPrev: boolean;
  public category: string;
  public modalActions = new EventEmitter<string|MaterializeAction>();
  public modalWarning = new EventEmitter<string|MaterializeAction>();
  public itemForm: FormGroup;
  public changeError: string;
  public ratingNum: number[] = [1,2,3,4,5];
  private searchPipe = new SearchPipe();
  private modalItem: Object[] = [];
  private ratingChanged: boolean;
  private modalEdit: boolean;
  private user: NotLogedInUser;
  public warningAction: Object;
  private loading: boolean = true;
  private isItemEditable: boolean;
  private validItemName: string = '';

  constructor(
    private router: Router,
    private tableNavigationService: TableNavigationService,
    private requestService: RequestService,
    private activatedRoute: ActivatedRoute,
    private filterService: FilterService,
    private itemsService: ItemsService,
    private formBuilder: FormBuilder,
    private dataService: DataService) {

    this.itemForm = this.formBuilder.group({
      'itemName': ['', Validators.required],
      'itemInfo': ['', Validators.required],
      'itemFotoUrl': ['', ValidationService.urlValidator],
      'itemBorrowedTo': ['']
    });

    this.subscription = this.tableNavigationService.showNextChange.subscribe((value) => {
      this.showNext = value;
    });

    this.subscription = this.tableNavigationService.showPrevChange.subscribe((value) => {
      this.showPrev = value;
    });

    filterService.searchFilter$.subscribe(searchInput => {
      let filteredCategories = this.searchPipe.transform(this.itemsService.items, searchInput);
      this.pageTable = this.tableNavigationService.getPage(filteredCategories, 'first');
    })
  }

  ngOnInit() {
    this.user = this.dataService.getUser();
    this.logedInUser = this.dataService.getLogedInUser();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.category = params['category'];
    });

    this.itemsService
        .getItems(`/${this.user._id}/${this.category}/items`)
        .then(result => {
          this.getItemsData()
          this.loading = false;
        });

    this.itemsService.events$.forEach(event => {
      this.refresh();
    });

    this.isItemEditable = this.user.username === this.logedInUser.username ? true : false

  }

  createModal(data) {
      this.modalItem = data;
      this.openModal();
  }

  refresh() {
    this.pageTable = this.tableNavigationService.getPage(this.itemsService.items, 'first');
    return this.pageTable;
  }

  getItemsData(){
    this.pageTable = this.tableNavigationService.getPage(this.itemsService.items, 'first');
    return this.pageTable;
  }

  getPrev(): Object[] {
    this.pageTable = this.tableNavigationService.getPage(this.itemsService.items, 'prev');
    return this.pageTable;
  }

  getNext(): Object[] {
    this.pageTable = this.tableNavigationService.getPage(this.itemsService.items, 'next');
    return this.pageTable;
  }

  showCategories() {
    this.router.navigate(['/home', this.dataService.getUser().username]);
  }

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }

  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

  openWarning(item, func) {
    this.modalWarning.emit({action:"modal",params:['open']});
    this.warningAction = function(){func(item)};
  }

  closeWarning(){
    this.modalWarning.emit({action:"modal",params:['close']});
  }

  deleteItem(item) {
   this.itemsService.removeItem(item._id, item.name);
   this.refresh();
  }

  changeItemInfo(id, name) {
    if (!this.itemsService.checkItem(name.value)) {
      this.validItemName = 'Item with such name exists';
      return;
    }

    if (this.itemForm.dirty && this.itemForm.valid) {
      this.requestService.changeItemInfo(id, this.itemForm, name.value, this.receiveResponseChange.bind(this));
      this.modalEdit = false;
    }
  }

  changeItemRating(id, ratingNum) {
    this.requestService.changeItemRating(id, ratingNum, this.receiveResponseChange.bind(this));
  }

  receiveResponseChange(status, response, id) {
    if (status === 200) {
      this.itemsService
        .getItems(`/${this.user._id}/${this.category}/items`)
        .then(result => {
          this.getItemsData()
          this.loading = false;
      });
    } else {
      this.changeError = response;
    }
  }

  onNavCurrClick() {
    this.router.navigate([`home/${this.user.username}`]);
  }
}
