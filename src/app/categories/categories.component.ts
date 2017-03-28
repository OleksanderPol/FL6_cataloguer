import { Component, OnInit, Input } from '@angular/core';
import { User } from '../app.model';
import { Routes, Router } from '@angular/router';
import { TableNavigationService } from '../services/table-navigation.service';
import {Subscription} from 'rxjs/Subscription';
import { DataService } from '../services/data.service';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input() categories: Object[];
  private pageTable: Object[] = [];
  private subscription: Subscription;
  private showNext: boolean;
  private showPrev: boolean;
    

  constructor(private router: Router, 
              private tableNavigationService: TableNavigationService,
              private dataService: DataService,
              private requestService: RequestService) {
              
              this.subscription = this.tableNavigationService.showNextChange.subscribe((value) => { 
                this.showNext = value; 
              });
      
              this.subscription = this.tableNavigationService.showPrevChange.subscribe((value) => { 
                this.showPrev = value; 
              });
              
  }

  ngOnInit() {
      this.requestService.getCategories(this.getCategoriesData.bind(this));   
  }
  getCategoriesData(){
    this.categories = this.dataService.getCategories();
    this.pageTable = this.tableNavigationService.getFirstPage(this.categories);
    return this.pageTable;
  }
  getPrev(): Object[] {
      this.pageTable = this.tableNavigationService.getPrev(this.categories);
      return this.pageTable;
  }
    
  getNext(): Object[] {
      this.pageTable = this.tableNavigationService.getNext(this.categories);
      return this.pageTable;
  }
    
  onClick (category) {
    this.router.navigate(['home/:user', category]);
  }
}
