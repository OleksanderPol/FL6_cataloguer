import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { DataService } from '../services/data.service';
import { User } from '../app.model';

@Component({
  selector: 'app-club-users',
  templateUrl: './club-users.component.html',
  styleUrls: ['./club-users.component.css']
})
export class ClubUsersComponent implements OnInit {
  private users: User[];

  constructor(private requestService: RequestService,
              private dataService: DataService) { }

  ngOnInit() {
    this.users = this.dataService.getClubUsers();
    console.log(this.users);
  }
}
