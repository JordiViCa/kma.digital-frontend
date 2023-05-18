import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent  implements OnInit {

  editForm: FormGroup;

  showD: boolean = false;

  changePasswordForm = this.formBuilder.group({
    passwordo: ['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],
    password: ['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],
    passwordr: ["",[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userSVC: UserService
  ) {
    this.editForm = this.formBuilder.group({
      username: [{value: '', disabled: true},[Validators.required]],
      name: ["",[Validators.required]],
      surname: ["",[Validators.required]],
      company: ["",[Validators.required]],
      phone: ["",[Validators.required]],
      cif: ["",[Validators.required]],
      description: [""]
    });
    this.userSVC.getActualUser().subscribe(
      (el: any) => {
        this.editForm.get('username')?.patchValue(el.data.email);
        this.editForm.get('name')?.patchValue(el.data.client.name);
        this.editForm.get('surname')?.patchValue(el.data.client.surname);
        this.editForm.get('company')?.patchValue(el.data.client.company);
        this.editForm.get('phone')?.patchValue(el.data.client.phone);
        this.editForm.get('cif')?.patchValue(el.data.client.cif);
        this.editForm.get('description')?.patchValue(el.data.client.description);
      }
    )
  }

  ngOnInit() {}

  closePopup(event: any) {
    if (event.target.id == "closePopup") {
      this.showD = false;
    }
  }

  completeEdit() {
    console.log("Complete edit")
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return
    }
    let params: any = {
      "name": this.editForm.value.name,
      "surname": this.editForm.value.surname,
      "company": this.editForm.value.company,
      "phone": this.editForm.value.phone,
      "cif": this.editForm.value.cif,
      "description": this.editForm.value.description,
    }
    this.userSVC.updateClient(params).subscribe(
      (el: any) => {
        if (!el) {
          return
        }
        this.showD = true;
      }
    )
  }

  changePassword() {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }
    let params: any = {
      passwordo: this.changePasswordForm.value.passwordo,
      password: this.changePasswordForm.value.password
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

}
