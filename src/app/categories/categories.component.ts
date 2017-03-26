import { Component, OnInit } from '@angular/core';
import { User } from '../app.model';
import { Routes, Router } from '@angular/router';
import { TableNavigationService } from '../services/table-navigation.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  private pageTable: string[] = [];
  private subscription: Subscription;
  private showNext = true;
  private showPrev = false;
    

  constructor(private router: Router, 
              private tableNavigationService: TableNavigationService) {
              
              this.subscription = this.tableNavigationService.showNextChange.subscribe((value) => { 
                this.showNext = value; 
              });
      
              this.subscription = this.tableNavigationService.showPrevChange.subscribe((value) => { 
                this.showPrev = value; 
              });
  }

  ngOnInit() {
      this.pageTable = this.tableNavigationService.getFirstPage('categories');
  }
  
  getPrev(): string[] {
      this.pageTable = this.tableNavigationService.getPrev('categories');
      return this.pageTable;
  }
    
  getNext(): string[] {
      this.pageTable = this.tableNavigationService.getNext('categories');
      return this.pageTable;
  }
    
  onClick (categorie) {
    this.router.navigate(['home/:user', categorie]);
  }
}
