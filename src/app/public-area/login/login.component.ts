import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  toggleCards: boolean = false;

  errorRegister: boolean = true;

  @Output() closePopUp = new EventEmitter<boolean>;
  @Input() toggleLogin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userSVC: UserService,
    private tokenSVC: TokenService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ["",[Validators.required]],
      password: ["", [Validators.required]]
    });
    this.registerForm = this.formBuilder.group({
      username: ["",[Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/)]],
      repeatPassword: ["", [Validators.required]]
    });
    this.registerForm.get('repeatPassword')?.addValidators(this.validarPass.bind(this));
  }

  validarPass(control: AbstractControl) {
    if (control.value === this.registerForm.value.password) {
      return null;
    }
    return {
      notEqual: true
    }
  }

  ngOnInit() {}

  login() {
    console.log("Enter Login")
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return
    }
    let params: any = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.userSVC.loginUser(params).subscribe((el: any) => {
      console.log('User logged',el)
      if (el == false) {
        this.loginForm.controls["username"].setErrors({invalid: true})
        this.loginForm.controls["password"].setErrors({invalid: true})
        return;
      }
      this.tokenSVC.saveToken(el.jwt);
      if (el.employee) {
        this.router.navigate(['/work']);
      } else {
        this.router.navigate(['/client', { username: this.registerForm.value.username }]);
      }
    });
  }

  register() {
    console.log("Enter Register")
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return
    }
    let params: any = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.username,
      password: this.registerForm.value.password
    }
    this.userSVC.createUser(params).subscribe((el: any) => {
      console.log('User created',el)
      if (el) {
        return;
      }
      this.tokenSVC.saveToken(el.jwt);
      this.router.navigate(['/client/completeRegister', { username: this.registerForm.value.username }]);
    });
  }

  swap() {
    this.toggleCards = !this.toggleCards;
  }

  close(event: any) {
    console.log(event)
    if (event.target.id == "closePopupLogin") {
      this.closePopUp.emit(true);
    }
  }
}
