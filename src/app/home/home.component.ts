import { Component, OnInit, Input, ElementRef, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { Routes, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
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
  public items: Object[];

  constructor(private dataService: DataService, private requestService: RequestService) {
  }

  ngOnInit() {
    this.requestService.getCategories(this.getCategoriesData.bind(this));
    this.user = this.dataService.getUser();
    console.log(this.user);
  }

  getCategoriesData(){
    this.categories = this.dataService.getCategories();
    console.log(this.categories);
  }

  showItems(target){
    this.requestService.getItems(target, this.getItemsData.bind(this));
  }

  getItemsData(items: string){
    this.items = JSON.parse(items);
    console.log(this.items);
  }

}

