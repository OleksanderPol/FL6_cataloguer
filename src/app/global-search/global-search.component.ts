import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { User } from '../app.model';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css']
})
export class GlobalSearchComponent implements OnInit {
  private searchValue: string = '';
  private user: User;
  private loading: boolean = false;

  constructor(private requestService: RequestService,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.dataService.getUser();
  }

  search(searchInput){
    if (searchInput !== ''){
      this.loading = true;
    }
    this.searchValue = searchInput;
    this.requestService.searchItems(this.searchValue, this.getItems.bind(this));
  }
  getItems(response){
    this.dataService.storeSearch(response);
    this.router.navigate([`home/${this.user.username}/items/search`, this.searchValue]);
    this.searchValue = '';
    this.loading = false;
  }
}
