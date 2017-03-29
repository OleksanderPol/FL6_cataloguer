import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { RequestService } from '../services/request.service';
import { ItemsService } from '../services/items.service';
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
    private items: Object[];
    private locationLength: number;

  constructor(
    private requestService: RequestService,
    private categoryService: CategoryService,
    private router: Router,
    private itemsService: ItemsService
  ) {
    router.events.subscribe((val) => {
      this.locationLength = val.url.split('/').length;
    });

  }

  ngOnInit() {

  }

  onClick() {
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
        break;

      case "date+":
        this.itemsService.sortByDate('+');
        break;

      case "date-":
        this.itemsService.sortByDate('-');
        break;

      case "rate":
        this.itemsService.sortByRating();
        break;
    }
  }

  onChangeCategories(value: String): void {
    if (value === 'alphabet') {
      this.categoryService.sortByAlphabet();
      this.onClick();
    }

    if (value === 'amount') {
      this.categoryService.sortByAmountOfItems();
      this.onClick();
    }
  }
}
