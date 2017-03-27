import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private RequestService: RequestService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signOutUser() {
    this.RequestService.signOut();
    this.router.navigate(['/']);
  }
}
