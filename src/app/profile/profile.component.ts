import { Component, EventEmitter, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import { MaterializeAction } from 'angular2-materialize';
import { RequestService } from '../services/request.service';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	@Input() user: Object;
  @Input() categories: any;
	public changeTrigger: boolean = false;
  public infoTrigger: boolean = false;
	public infoForm: FormGroup;
	public changeError: string;
  public itemsAmount: Object;

  constructor(private formBuilder: FormBuilder, private changeInfoService: RequestService, private router: Router, private dataService: DataService) {
  	this.infoForm = this.formBuilder.group({
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'info': ['']
    });     
  }

  ngOnInit() {
     
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
      this.changeInfoService.changeUserRequest(this.dataService.getUser().username, this.infoForm.value.email, this.infoForm.value.info, this.receiveResponseChange.bind(this));
    }
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
