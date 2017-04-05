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

  constructor(private requestService: RequestService,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.user = this.dataService.getUser();
  }

  search(searchInput: string): void {
    if (searchInput !== '') {
      this.router.navigate([`home/${this.user.username}/items/search`, searchInput]);
      this.searchValue = '';
    }
  }
}
