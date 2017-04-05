import { Component, OnInit, Input, ElementRef, Pipe, PipeTransform, ViewChild, Output, AfterViewInit, EventEmitter } from '@angular/core';
import { Routes, Router, ActivatedRoute, Params, NavigationStart } from '@angular/router';
import { DataService } from '../services/data.service';
import { MaterializeDirective } from "angular2-materialize";
import { MaterializeAction } from 'angular2-materialize';
import { RequestService } from '../services/request.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { SearchPipe } from '../search/search.pipe';
import { FilterService } from '../services/filter.service';
import { User } from '../app.model';
import { CategoryService } from '../services/category.service';

import {
    Event as RouterEvent,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public user: User;
  public searchFilter: string;
  private logedInUser: Object;
  private modalAction = new EventEmitter<string | MaterializeAction>();

  constructor(private dataService: DataService,
    private requestService: RequestService,
    private filterService: FilterService,
    private router: Router,
    private categoryService: CategoryService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.user = this.dataService.getUser();
      }
    });
  }

  ngOnInit() {
    this.user = this.dataService.getUser();
    this.logedInUser = this.dataService.getLogedInUser();
    this.categoryService.onInit();
  }

  play(): void {
    this.router.navigate([`home/${this.user.username}/tictactoe`]);
  }

  openModal():void {
    this.modalAction.emit({ action: 'modal', params: ['open'] });
  }

  closeModal():void {
    this.modalAction.emit({ action: 'modal', params: ['close'] });
  }

  inputSearchValue(value: string):void {
    this.filterService.addSearchPhrase(value);
  }
}
