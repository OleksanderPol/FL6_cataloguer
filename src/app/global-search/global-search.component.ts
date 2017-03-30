import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css']
})
export class GlobalSearchComponent implements OnInit {
  private searchValue: string;
  private user: Object;

  constructor(private requestService: RequestService,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.dataService.getUser().username;
  }

  search(searchInput){
    this.searchValue = searchInput;
    this.requestService.searchItems(searchInput, this.getItems.bind(this));
  }
  getItems(response){
    this.dataService.storeSearch(response);
    this.router.navigate([`home/:user/items/search`, this.searchValue]);
  }
}
