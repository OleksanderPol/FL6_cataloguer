import { Component, OnInit, Input } from '@angular/core';
import { Routes, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { MaterializeDirective } from "angular2-materialize";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public user: Object;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.user = this.dataService.getUser();
    console.log(this.user);
  }
}
