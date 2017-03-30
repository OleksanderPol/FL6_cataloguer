import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { RequestService } from '../services/request.service';
import { ItemsService } from '../services/items.service';
import { CategoryService } from '../services/category.service';
import { MaterializeAction } from 'angular2-materialize';


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

  constructor(
    private requestService: RequestService,
    private categoryService: CategoryService,
    private router: Router,
    private itemsService: ItemsService) {

    router.events.subscribe((val) => {
      this.locationLength = val.url.split('/').length;
    });
  }

  ngOnInit() {
    this.update.emit('');
  }

  openModal() {
    this.modalAction.emit({ action: "modal", params: ['open'] });
  }

  closeModal() {
    this.modalAction.emit({ action: "modal", params: ['close'] });
  }

  onCategoryClick() {
    this.categoryService.newEvent('refreshCategories');
  }

  onItemClick() {
    this.itemsService.newEvent('refreshItems');
  }

  signOutUser():void {
    this.requestService.signOut();
    this.router.navigate(['/']);
  }

  onChangeItems(value: String): void {
    switch (value) {
      case "alphabet":
        this.itemsService.sortByAlphabet();
        this.onItemClick();
        break;

      case "date+":
        this.itemsService.sortByDate('+');
        this.onItemClick();
        break;

      case "date-":
        this.itemsService.sortByDate('-');
        this.onItemClick();
        break;

      case "rate":
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

  addItem(name, info = '', fotoUrl = '', category): void {
    let uppercaseCategory = category.toUpperCase(),
        uppercaseName = name.toUpperCase();
    console.log(name, category);

    if (!this.itemsService.items) {
      console.log(this.itemsService.items);
      this.itemsService.getItems(`${category}/items`)
        .then(result => {
          if (!this.categoryService.checkCategory(uppercaseCategory)) {
            if (this.itemsService.checkItem(uppercaseName)) {
              this.itemsService.addItem(name, info, fotoUrl, category);
              this.itemSuccess = 'Item successfully added';
            } else {
              this.itemSuccess = '';
              this.itemError = 'Such Item already exist';
            }
          } else {
            this.itemSuccess = '';
            this.itemError = 'Such category dont exist';
          }
        });
    }


  }
}
