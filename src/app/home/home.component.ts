import { Component, OnInit, Input, ElementRef, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { Routes, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { MaterializeDirective } from "angular2-materialize";
import { RequestService } from '../services/request.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  public user: Object;
  public categories: Object[];

  constructor(private dataService: DataService, private requestService: RequestService) {
  }

  ngOnInit() {
    this.user = this.dataService.getUser();
    this.requestService.getCategories(this.getCategoriesData.bind(this));
    this.categories = this.dataService.getCategories();
  }

  getCategoriesData(){
    this.categories = this.dataService.getCategories();
  }
}

