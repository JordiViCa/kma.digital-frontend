import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-complete-register',
  templateUrl: './complete-register.component.html',
  styleUrls: ['./complete-register.component.scss'],
})
export class CompleteRegisterComponent  implements OnInit {

  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userSVC: UserService
    
  ) {
    this.registerForm = this.formBuilder.group({
      username: [{value: this.route.snapshot.params['username'] ?? '', disabled: true},[Validators.required]],
      name: ["",[Validators.required]],
      surname: ["",[Validators.required]],
      company: ["",[Validators.required]],
      phone: ["",[Validators.required]],
      cif: ["",[Validators.required]],
      interests: ["",[Validators.required]],
      description: [""]
    });
    this.userSVC.getActualUser().subscribe(
      (el: any) => {
        if (el.data.client) {
          this.router.navigateByUrl("/client")
        }
        this.registerForm.get('username')?.patchValue(el.data.email);
      }
    )
  }

  ngOnInit() {}

  completeRegister() {
    console.log("Complete Register")
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return
    }
    let params: any = {
      "name": this.registerForm.value.name,
      "surname": this.registerForm.value.surname,
      "company": this.registerForm.value.company,
      "phone": this.registerForm.value.phone,
      "cif": this.registerForm.value.cif,
      "interests": this.registerForm.value.interests,
      "description": this.registerForm.value.description
    }
    console.log(params)
    this.userSVC.createClient(params).subscribe((el: any) => {
      console.log('Client created',el)
      if (el == false) {
        return;
      }
      this.router.navigate(['/client']);
    });
  }

}
