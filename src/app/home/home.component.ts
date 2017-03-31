import { Component, OnInit, Input, ElementRef, Pipe, PipeTransform, ViewChild, Output, AfterViewInit } from '@angular/core';
import { Routes, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { MaterializeDirective } from "angular2-materialize";
import { RequestService } from '../services/request.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { SearchPipe } from '../search/search.pipe';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public user: Object;
  public searchFilter: string;

  constructor(private dataService: DataService,
              private requestService: RequestService,
              private filterService: FilterService) {}

  ngOnInit() {
    this.user = this.dataService.getUser();
  }

  inputSearchValue(value){
    this.filterService.addSearchPhrase(value);
  }
}
