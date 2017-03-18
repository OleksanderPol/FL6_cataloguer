import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from './validation.service';
import { MaterializeAction } from 'angular2-materialize';
import { RequestService } from './request.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public modalActionsLogin = new EventEmitter<string | MaterializeAction>();
  public modalActionsRegister = new EventEmitter<string | MaterializeAction>();
  public registerForm: FormGroup;
  public userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private signInService: RequestService) {

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

  openModalLogin() {
    this.modalActionsLogin.emit({ action: "modal", params: ['open'] });
  }
  closeModalLogin() {
    this.modalActionsLogin.emit({ action: "modal", params: ['close'] });
  }

  loginUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      console.log(`Name: ${this.userForm.value.name} Password: ${this.userForm.value.password}`);
      this.signInService.signIn(this.userForm.value.name, this.userForm.value.password);
      this.closeModalLogin();
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
      console.log(`Name: ${this.registerForm.value.name} Password: ${this.registerForm.value.password} Email: ${this.registerForm.value.email}`);
      this.closeModalRegister();
    }
  }
}



