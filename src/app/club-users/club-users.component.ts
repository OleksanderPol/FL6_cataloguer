import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { DataService } from '../services/data.service';
import { User } from '../app.model';
import { Router, ActivatedRoute, Params, NavigationStart } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchUserPipe } from '../search/search.pipe';
import { FilterService } from '../services/filter.service';
import { TableNavigationService } from '../services/table-navigation.service';
import { Subscription } from 'rxjs/Subscription';
import { ClubUsersService } from '../services/club-users.service';

@Component({
  selector: 'app-club-users',
  templateUrl: './club-users.component.html',
  styleUrls: ['./club-users.component.css']
})
export class ClubUsersComponent implements OnInit {
  private users: User[] = [];
  private subscription: Subscription;
  private pageTable: Object[] = [];
  private showNext: boolean;
  private showPrev: boolean;
  private searchPipe = new SearchUserPipe();
  private loading: boolean = true;
  public category: string;
  private logedInUser: User;

  constructor(private requestService: RequestService,
    private dataService: DataService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private filterService: FilterService,
    private tableNavigationService: TableNavigationService,
    private activatedRoute: ActivatedRoute,
    private clubUserService: ClubUsersService) {
    this.subscription = this.tableNavigationService.showNextChange.subscribe((value) => {
      this.showNext = value;
    });

    this.subscription = this.tableNavigationService.showPrevChange.subscribe((value) => {
      this.showPrev = value;
    });
    filterService.searchFilter$.subscribe(searchInput => {
      let filteredUsers = this.searchPipe.transform(this.users, searchInput);
      this.pageTable = this.tableNavigationService.getPage(filteredUsers, 'first');
    });
  }

  ngOnInit() {
    this.logedInUser = this.dataService.getLogedInUser();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.category = params['category'];
    });

    this.clubUserService.getClubUsers(`users/${this.category}`)
      .then(response => {
        this.users = this.clubUserService.clubUsers;
        this.loading = false;
        this.pageTable = this.tableNavigationService.getPage(this.users, 'first')
      });


    this.clubUserService.events$.forEach(event => {
      if (event === 'refreshUsersCategories') {
        this.pageTable = this.tableNavigationService.getPage(this.users, 'first')
      }
    });
  }

  getPrev(): Object[] {
    this.pageTable = this.tableNavigationService.getPage(this.users, 'prev');
    return this.pageTable;
  }

  getNext(): Object[] {
    this.pageTable = this.tableNavigationService.getPage(this.users, 'next');
    return this.pageTable;
  }
  showUser(user) {
    this.dataService.storeUser(JSON.stringify(user));
    this.router.navigate(["home", user.username]);
  }
  showAllUsersCategories() {
    this.router.navigate([`home/${this.dataService.getUser().username}`, 'usersCategories']);
  }


}
