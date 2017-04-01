import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';

import { RequestService } from '../services/request.service';
import { ItemsService } from '../services/items.service';
import { CategoryService } from '../services/category.service';
import { DataService } from '../services/data.service';




@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Output() update = new EventEmitter();
  public modalAction = new EventEmitter<string | MaterializeAction>();
  private locationLength: number;
  private categoryError: string;
  private categorySuccess: string;
  private itemError: string;
  private itemSuccess: string;
  private currentCategory: string;

  constructor(
    private requestService: RequestService,
    private categoryService: CategoryService,
    private router: Router,
    private itemsService: ItemsService,
    private dataSerice: DataService) {

    router.events.subscribe((val) => {
      this.locationLength = val.url.split('/').length;
    });
  }

  ngOnInit() {
    this.update.emit('');
  }

  openModal() {
    this.modalAction.emit({ action: 'modal', params: ['open'] });
    this.categoryError = '';
    this.itemError = '';
  }

  closeModal(location: string) {
    if (this.categorySuccess && location === 'categories') {
      setTimeout(() => {
        this.modalAction.emit({ action: 'modal', params: ['close'] });
        this.categorySuccess = '';
      }, 1000);
    }

    if (this.itemSuccess && location === 'items') {
      setTimeout(() => {
        this.modalAction.emit({ action: 'modal', params: ['close'] });
        this.itemSuccess = '';
      }, 1000);
    }
  }

  onCategoryClick() {
    this.categoryService.newEvent('refreshCategories');
  }

  onItemClick() {
    this.itemsService.newEvent('refreshItems');
  }

  signOutUser():void {
    this.requestService.signOut();
    this.dataSerice.removeUser();
    this.router.navigate(['/']);
  }

  onChangeItems(value: String): void {
    switch (value) {
      case 'alphabet':
        this.itemsService.sortByAlphabet();
        this.onItemClick();
        break;

      case 'date+':
        this.itemsService.sortByDate('+');
        this.onItemClick();
        break;

      case 'date-':
        this.itemsService.sortByDate('-');
        this.onItemClick();
        break;

      case 'rate':
        this.itemsService.sortByRating();
        this.onItemClick();
        break;
    }
  }

  onChangeCategories(value: String): void {
    if (value === 'alphabet') {
      this.categoryService.sortByAlphabet();
      this.onCategoryClick();
    }

    if (value === 'amount') {
      this.categoryService.sortByAmountOfItems();
      this.onCategoryClick();
    }
  }

  addCategory(categoryName): void {
    categoryName = categoryName.toUpperCase();

    if (this.categoryService.checkCategory(categoryName)){
      this.categoryService.addCategory(categoryName);
      this.categorySuccess = 'Cutegory successfully added';
      this.categoryError = '';
    } else {
      this.categorySuccess = '';
      this.categoryError = 'Such category exist';
    }
  }

  addItem(name, info = '', fotoUrl = ''): void {
    let uppercaseName = name.toUpperCase();

    if (this.itemsService.checkItem(uppercaseName)) {
      this.itemsService.addItem(name, info, fotoUrl, this.router.url.split('/')[3])
        .then(res => {
          if (res !== 'Server Error') {
            this.itemError = '';
            this.itemSuccess = 'Item successfully added';
            this.closeModal('items');
          } else {
            this.itemError = 'Server error 500';
          }
        });
    } else {
      this.itemError = 'Such Item already exist';
    }
  }
}
