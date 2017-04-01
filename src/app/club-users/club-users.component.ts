import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { DataService } from '../services/data.service';
import { User } from '../app.model';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-club-users',
  templateUrl: './club-users.component.html',
  styleUrls: ['./club-users.component.css']
})
export class ClubUsersComponent implements OnInit {
  private users: User[];

  constructor(private requestService: RequestService,
              private dataService: DataService,
              private router: Router,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.users = this.dataService.getClubUsers();
    console.log(this.users);
  }
  showUser(username){
    this.router.navigate(["home", username]);
  }
}
