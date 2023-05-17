import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent  implements OnInit {

  show: boolean = false;
  user: any;
  showD: boolean = false;

  userForm = this.formBuilder.group({
    name: ['',[Validators.required]],
    phone: ["",[Validators.required]],
    nif: ["",[Validators.required]],
  });

  changePasswordForm = this.formBuilder.group({
    passwordo: ['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],
    password: ['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],
    passwordr: ["",[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],
  });

  newUserForm = this.formBuilder.group({
    name: ['',[Validators.required]],
    phone: ["",[Validators.required]],
    nif: ["",[Validators.required]],
    email: ["",[Validators.required, Validators.email]],
    password: ["",[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],
    confirm: ["",[Validators.required]]
  });

  constructor(
    private userSVC: UserService,
    private formBuilder: FormBuilder
  ) {
    this.changePasswordForm.get('passwordr')?.addValidators((control: AbstractControl)  => {
      if (control.value === this.changePasswordForm.value.password) {
        return null;
      }
      return {
        notEqual: true
      }
    });
    this.newUserForm.get('confirm')?.addValidators((control: AbstractControl)  => {
      if (control.value === this.newUserForm.value.password) {
        return null;
      }
      return {
        notEqual: true
      }
    });
    this.userSVC.getActualUser().subscribe(
      (el:any) => {
        if (!el) {
          return;
        }
        this.user = el.data;
        this.userForm.patchValue({
          name: el.data.employee.name,
          phone: el.data.employee.phone,
          nif: el.data.employee.nif
        })
        console.log(el)
      }
    )
  }

  ngOnInit() {
  }

  updateUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    let params: any = {
      name: this.userForm.value.name,
      nif: this.userForm.value.nif,
      phone: this.userForm.value.phone
    }
    this.userSVC.updateEmployee(params).subscribe(
      (employee: any) => {
        console.log(employee)
        if (!employee || employee.data == undefined) {
          this.userForm.markAllAsTouched();
          this.userForm.controls.name.setErrors({error: "err"});
          this.userForm.controls.nif.setErrors({error: "err"});
          this.userForm.controls.phone.setErrors({error: "err"});
          setTimeout(() => {
            this.userForm.controls.name.setErrors({error: null});
            this.userForm.controls.nif.setErrors({error: null});
            this.userForm.controls.phone.setErrors({error: null});
            this.userForm.controls.name.updateValueAndValidity();
            this.userForm.controls.nif.updateValueAndValidity();
            this.userForm.controls.phone.updateValueAndValidity();
            this.userForm.markAsUntouched();
          }, 2000);
          return;
        }
        this.showD = true;
        this.user.employee = employee.data;
      }
    )
  }

  changePassword() {
    if (this.changePasswordForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    let params: any = {
      passwordo: this.changePasswordForm.value.passwordo,
      password: this.changePasswordForm.value.password,
      user: this.user._id
    }
    this.userSVC.changePassword(params).subscribe(
      (user: any) => {
        if (!user) {
          return;
        }
        this.showD = true;
        this.changePasswordForm.reset()
        console.log(user)
      }
    )
  }

  closePopup(event: any) {
    if (event.target.id == "closePopup") {
      this.showD = false;
      this.show = false;
    }
  }

  createUser() {
    if (this.newUserForm.invalid) {
      this.newUserForm.markAllAsTouched();
      return;
    }
    let params: any = {
      name: this.newUserForm.value.name,
      phone: this.newUserForm.value.phone,
      nif: this.newUserForm.value.nif,
      email: this.newUserForm.value.email,
      password: this.newUserForm.value.password
    }
    this.userSVC.createWorker(params).subscribe(
      (el: any) => {
        console.log(el)
        if (!el) {
          return;
        }
      }
    )
  }
}
