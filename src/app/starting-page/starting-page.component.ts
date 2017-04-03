import { Component, EventEmitter, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import { MaterializeAction } from 'angular2-materialize';
import { RequestService } from '../services/request.service';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: './starting-page.component.html',
  styleUrls: ['./starting-page.component.css']
})
export class StartingPageComponent implements OnInit {
  public modalActionsLogin = new EventEmitter<string | MaterializeAction>();
  public modalActionsRegister = new EventEmitter<string | MaterializeAction>();
  public registerForm: FormGroup;
  public userForm: FormGroup;
  public loginError: string;
  public registerError: string;
  public user: Object;

  constructor(private formBuilder: FormBuilder, private signInService: RequestService, private registerService: RequestService, private router: Router, private RequestService: RequestService, private dataService: DataService) {

    this.userForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'password': ['', [Validators.required, ValidationService.passwordValidator]]
    });

    this.registerForm = this.formBuilder.group({
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'name': ['', [Validators.required]],
      'password': ['', [Validators.required, ValidationService.passwordValidator]]
    });

  }
  
  ngOnInit() {
    if (this.dataService.getLogedInUser() && this.dataService.getLogedInUser().username === this.dataService.getUser().username){
      this.dataService.storeUser(JSON.stringify(this.dataService.getLogedInUser()));
      this.router.navigate(['/home', this.dataService.getLogedInUser().username])
    }
  }

  openModalLogin() {
    this.modalActionsLogin.emit({ action: "modal", params: ['open'] });
  }
  closeModalLogin() {
    this.modalActionsLogin.emit({ action: "modal", params: ['close'] });
  }

  loginUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      this.signInService.signIn(this.userForm.value.name, this.userForm.value.password, this.receiveResponseLogin.bind(this));
    }
  }

  receiveResponseLogin(status, response, username) {
    if (status === 200) {
      this.dataService.storeUser(response);
      this.dataService.storeLogedInUser(response);
      this.router.navigate(['/home', username]);
      this.closeModalLogin();
    } else {
      this.loginError = response;
    }
  }

  openModalRegister() {
    this.modalActionsRegister.emit({ action: "modal", params: ['open'] });
  }
  closeModalRegister() {
    this.modalActionsRegister.emit({ action: "modal", params: ['close'] });
  }

  registerUser() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      this.registerService.registerRequest(this.registerForm.value.email, this.registerForm.value.name, this.registerForm.value.password, this.receiveResponseRegister.bind(this));
    }
  }

  receiveResponseRegister(status, response, username) {
    if (status === 200) {
      this.dataService.storeUser(response);
      this.dataService.storeLogedInUser(response);
      this.router.navigate(['/home', username]);
      this.closeModalRegister();
      this.user = response;
    } else {
      this.registerError = response;
    }
  }

}
