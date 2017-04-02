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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public user: Object;
  public searchFilter: string;
  logedInUser: string;
  private modalAction = new EventEmitter<string | MaterializeAction>();

  constructor(private dataService: DataService,
    private requestService: RequestService,
    private filterService: FilterService,
    private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.user = this.dataService.getUser();
      }
    })

  }

  ngOnInit() {
    this.user = this.dataService.getUser();
    this.logedInUser = this.dataService.getLogedInUserId();
    console.log(this.logedInUser);
  }

  openModal() {
    this.modalAction.emit({ action: 'modal', params: ['open'] });
  }

  closeModal() {
    this.modalAction.emit({ action: 'modal', params: ['close'] });
  }

  inputSearchValue(value) {
    this.filterService.addSearchPhrase(value);
  }
}
