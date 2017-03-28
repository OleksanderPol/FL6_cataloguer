import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { RequestService } from '../services/request.service';
import { ItemsService } from '../services/items.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Output() update = new EventEmitter();
  private items: Object[];

  constructor(
    private RequestService: RequestService,
    private router: Router,
    private itemsService: ItemsService
  ) { }

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

  onChange(value: String): void {
    switch (value) {
      case "alphabet":
        console.log(this.itemsService.getByAlphabet());
        break;

      case "date+":
        console.log(this.itemsService.getByDate('+'));
        break;

      case "date-":
        console.log(this.itemsService.getByDate('-'));
        break;

      case "rate":
        console.log(this.itemsService.getByRating());
        break;
    }
  }
}
