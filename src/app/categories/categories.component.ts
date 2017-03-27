import { Component, OnInit, Input } from '@angular/core';
import { User } from '../app.model';
import { Routes, Router } from '@angular/router';
import { TableNavigationService } from '../services/table-navigation.service';
import {Subscription} from 'rxjs/Subscription';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input() categories: Object[];
  private pageTable: Object[] = [];
  private subscription: Subscription;
  private showNext = true;
  private showPrev = false;
    

  constructor(private router: Router, 
              private tableNavigationService: TableNavigationService,
              private dataService: DataService) {
              
              this.subscription = this.tableNavigationService.showNextChange.subscribe((value) => { 
                this.showNext = value; 
              });
      
              this.subscription = this.tableNavigationService.showPrevChange.subscribe((value) => { 
                this.showPrev = value; 
              });
  }

  ngOnInit() {
      this.pageTable = this.tableNavigationService.getFirstPage(this.categories);
  }
  
  getPrev(): Object[] {
      this.pageTable = this.tableNavigationService.getPrev(this.categories);
      return this.pageTable;
  }
    
  getNext(): Object[] {
      this.pageTable = this.tableNavigationService.getNext(this.categories);
      return this.pageTable;
  }
    
  onClick (categorie) {
    this.router.navigate(['home/:user', categorie]);
  }
}
