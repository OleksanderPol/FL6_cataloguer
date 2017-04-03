import { Component, EventEmitter, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import { MaterializeAction } from 'angular2-materialize';
import { RequestService } from '../services/request.service';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { CategoryService } from '../services/category.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	@Input() user: Object;
	public changeTrigger: boolean = false;
  public infoTrigger: boolean = false;
	public infoForm: FormGroup;
	public changeError: string;
  private itemsAmount: number;
  private categoriesAmount: number;

  constructor(
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private router: Router,
    private dataService: DataService,
    private itemsService: ItemsService,
    private categoryService: CategoryService) {


  	this.infoForm = this.formBuilder.group({
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'info': [''],
      'city': [''],
      'telephone': [''],
      'photoUrl': ['']
    });
  }

  ngOnInit() {
    this.categoryService.events$.forEach(event => {
      this.refreshCategories();
    });
     this.itemsService.events$.forEach(event => {
      this.refreshItems(event);
    });
  }

  refreshItems(indicator: string): void {
    if (indicator === 'add') {
      this.itemsAmount += 1;
    }

    if (indicator === 'remove') {
      this.itemsAmount -= 1;
    }
  }

  refreshCategories(): void {
    this.categoriesAmount = this.categoryService.categories.length;
    this.itemsAmount = this.categoryService.categories.reduce((sum,category) => {
      return sum += category.amountOfItems;
    }, 0);
  }

  showChange() {
    this.infoTrigger = false;
    this.changeTrigger = true;
  }

  showInfo() {
    this.infoTrigger = true;
    this.changeTrigger = false;
  }

  showUser() {
    this.infoTrigger = false;
    this.changeTrigger = false;
  }

  changeInfo() {
    this.showUser();
    if (this.infoForm.dirty && this.infoForm.valid) {
      this.requestService.changeUserRequest(this.dataService.getUser().username,
                                            this.infoForm.value.email, this.infoForm.value.info,
                                            this.infoForm.value.telephone, this.infoForm.value.city,
                                            this.infoForm.value.photoUrl,
                                            this.receiveResponseChange.bind(this));
    }
  }

  showCategories() {
    this.router.navigate(['/home', this.dataService.getUser().username]);
  }

  showAllUsersCategories() {
    this.router.navigate([`home/${this.dataService.getLogedInUser().username}`, 'usersCategories']);
  }

  receiveResponseChange(status, response, username) {
    if (status === 200) {
      this.router.navigate(['/home', username]);
      this.dataService.storeUser(response);
      this.user = this.dataService.getUser();
    } else {
      this.changeError = response;
    }
  }
}
