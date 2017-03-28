import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { User } from '../app.model';
import { Routes, Router, ActivatedRoute, Params } from '@angular/router';
import { TableNavigationService } from '../services/table-navigation.service';
import { Subscription } from 'rxjs/Subscription';
import { RequestService } from '../services/request.service';
import { MaterializeAction } from 'angular2-materialize';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.css']
})
export class CategoryItemsComponent implements OnInit {

  private pageTable: Object[] = [];
  private subscription: Subscription;
  private showNext: boolean;
  private showPrev: boolean;
  public items: Object[];
  public category: string;
  modalActions = new EventEmitter<string|MaterializeAction>();
    

  constructor(private router: Router, 
              private tableNavigationService: TableNavigationService,
              private requestService: RequestService,
              private activatedRoute: ActivatedRoute) {
              
              this.subscription = this.tableNavigationService.showNextChange.subscribe((value) => { 
                this.showNext = value; 
              });
      
              this.subscription = this.tableNavigationService.showPrevChange.subscribe((value) => { 
                this.showPrev = value; 
              });
              
  }

  ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
        this.category = params['category'];
        });
        this.requestService.getItems(this.category, this.getItemsData.bind(this));
  }
    getItemsData(items: string){
        this.items = JSON.parse(items);
        this.pageTable = this.tableNavigationService.getFirstPage(this.items);
        return this.pageTable; 
    }   
    
 
  getPrev(): Object[] {
      this.pageTable = this.tableNavigationService.getPrev(this.items);
      return this.pageTable;
  }
    
  getNext(): Object[] {
      this.pageTable = this.tableNavigationService.getNext(this.items);
      return this.pageTable;
  }
 
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

}