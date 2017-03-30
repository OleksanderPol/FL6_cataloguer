import { Component, OnInit, Input, ElementRef, Pipe, PipeTransform, ViewChild, Output } from '@angular/core';
import { Routes, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { MaterializeDirective } from "angular2-materialize";
import { RequestService } from '../services/request.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { SearchComponent } from '../search/search.component';
import { SearchPipe } from '../search/search.pipe';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public user: Object;
  public categories: Object[];
  public items: Object[];
  public searchFilter: string;
  public isCategoryAvaileble: boolean = false;

  constructor(private dataService: DataService, 
              private requestService: RequestService, 
              private filterService: FilterService) {}

  ngOnInit() {
    this.requestService.getCategories(this.getCategoriesData.bind(this));
    this.user = this.dataService.getUser();
  }

  getCategoriesData(){
    this.categories = this.dataService.getCategories();

    this.isCategoryAvaileble = true;
  }

  showItems(target){
    this.requestService.getItems(target, this.getItemsData.bind(this));
  }

  getItemsData(items: string){
    this.items = JSON.parse(items);
  }

  inputSearchValue(value){
    this.filterService.addSearchPhrase(value);
  }
}