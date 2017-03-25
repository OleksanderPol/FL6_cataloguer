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
	public changeTrigger: boolean = false;
	public infoForm: FormGroup;
	public changeError: string;

  constructor(private formBuilder: FormBuilder, private changeInfoService: RequestService, private router: Router, private dataService: DataService) {
  	this.infoForm = this.formBuilder.group({
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'info': ['']
    });
  }

  ngOnInit() {
    
  }

  showChange() {
  	this.changeTrigger = !this.changeTrigger;
  }

  changeInfo() {
  	this.showChange();
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
