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
  }

  signOutUser():void {
    this.RequestService.signOut();
    this.router.navigate(['/']);
  }

  getItems(): void {
    this.itemsService
        .getItems('/Music/items')
        .then(items => this.items = items); //do everithyng we need here
  }
  onChange(value: String): void {
    if (value === 'alphabet') {
      this.itemsService
          .getByAlphabet('/Music/items')
          .then(items => {
            this.items = items;
            console.log(this.items);
          }); //do everithyng we need here
    }
  }
}
