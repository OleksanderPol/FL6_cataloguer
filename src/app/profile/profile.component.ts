import { Component, EventEmitter, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import { MaterializeAction } from 'angular2-materialize';
import { RequestService } from '../services/request.service';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute, Params, NavigationExtras, NavigationStart } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { CategoryService } from '../services/category.service';
import { User, NotLogedInUser } from '../app.model';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	// @Input() user: User;
  public user: NotLogedInUser;
  private loggedUser: User;
	public changeTrigger: boolean;
  public infoTrigger: boolean;
	public infoForm: FormGroup;
	public changeError: string;
  public userPhoto: string;
  private itemsAmount: number;
  private categoriesAmount: number;
  private allowChange: boolean;
  private userPosition: boolean;

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
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.user = this.dataService.getUser();
      }
      this.allowChange = this.user.username === this.loggedUser.username ? true : false;
    });
  }

  ngOnInit() {
    this.changeTrigger = false;
    this.infoTrigger = false;
    this.userPhoto = "";
    this.user = this.dataService.getUser();
    this.loggedUser = this.dataService.getLogedInUser();
    this.userPosition = true;

    this.categoryService.events$.forEach(event => {
      this.refreshCategories();
    });
     this.itemsService.events$.forEach(event => {
      this.refreshItems(event);
    });
  }

  showInfo() {
    this.infoTrigger = true;
    this.changeTrigger = false;
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
    this.itemsAmount = this.categoryService.categories.reduce((sum, category) => {
      return sum += category.amountOfItems;
    }, 0);
  }

  showChange() {
    this.infoTrigger = false;
    this.changeTrigger = true;
  }

  showUser() {
    this.infoTrigger = false;
    this.changeTrigger = false;
  }

  changeInfo() {
    if (this.infoForm.valid) {
      this.requestService.changeUserRequest(this.dataService.getLogedInUser().username,
                                            this.infoForm.value.email, this.infoForm.value.info,
                                            this.infoForm.value.telephone, this.infoForm.value.city,
                                            this.infoForm.value.photoUrl,
                                            this.receiveResponseChange.bind(this));
    }
  }

  showCategories() {
    // this.dataService.storeUser(this.dataService.getLogedInUser());
    this.userPosition = true;
    this.router.navigate(['/home', this.dataService.getUser().username]);
  }

  showAllUsersCategories() {
    this.userPosition = false;
    this.router.navigate([`home/${this.dataService.getLogedInUser().username}`, 'usersCategories']);
  }

  receiveResponseChange(status, response, username) {
    if (status === 200) {
      this.dataService.storeUser(response);
      this.dataService.storeLogedInUser(response);
      this.user = this.dataService.getUser();
      this.loggedUser = this.dataService.getLogedInUser();
      this.showUser();
    } else {
      this.changeError = response;
      alert(this.changeError);
    }
  }
}
