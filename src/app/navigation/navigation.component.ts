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
  @Output() update = new EventEmitter();
    private items: Object[];
    private locationLength: number;

  constructor(
    private RequestService: RequestService,
    private CategoryService: CategoryService,
    private router: Router,
    private itemsService: ItemsService
  ) {
    router.events.subscribe((val) => {
      this.locationLength = val.url.split('/').length;
      console.log(this.locationLength);
    });
  }

  ngOnInit() {
    this.update.emit('');
    this.getItems();
  }

  signOutUser():void {
    this.RequestService.signOut();
    this.router.navigate(['/']);
  }

  getItems(): void {
    this.itemsService
        .getItems('/Books/items')
        .then(items => {
          this.items = items;
          console.log(this.items);
        });
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
      this.CategoryService.sortByAlphabet();
    }

    if (value === 'amount') {
      this.CategoryService.sortByAlphabet();
    }
  }
}
