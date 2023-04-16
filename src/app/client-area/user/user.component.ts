import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent  implements OnInit {

  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editForm = this.formBuilder.group({
      username: [this.route.snapshot.params['username'] ?? '',[Validators.required]],
      name: ["",[Validators.required]],
      surname: ["",[Validators.required]],
      company: ["",[Validators.required]],
      phone: ["",[Validators.required]],
      cif: ["",[Validators.required]],
      description: [""]
    });
    if (this.route.snapshot.params['username']) {
      this.editForm.get('username')?.markAsTouched()
    }
  }

  ngOnInit() {}

  completeRegister() {

  }

}
