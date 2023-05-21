import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent  implements OnInit {

  show: boolean = false;

  animationTrigger: boolean = false;
  contactForm: FormGroup = this.formBuilder.group({
    title: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    name: ["", [Validators.required]],
    message: ["", [Validators.required]],
  });;

  constructor(
    private formBuilder: FormBuilder,
    private contactSVC: ContactService
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.animationTrigger = true;
    }, 5);
  }

  sendContactForm() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched()
      return;
    }
    let params: any = {
      title: this.contactForm.value.title,
      email: this.contactForm.value.email,
      name: this.contactForm.value.name,
      message: this.contactForm.value.message,
    }
    console.log(params)
    this.contactSVC.createContact(params).subscribe(
      (el: any) => {
        if (!el) {
          this.contactForm.controls["title"].setErrors({invalid: true})
          this.contactForm.controls["email"].setErrors({invalid: true})
          this.contactForm.controls["name"].setErrors({invalid: true})
          this.contactForm.controls["message"].setErrors({invalid: true})
          return;
        }
        this.show = true;
      }
    )
  }

  closePopup(event: any) {
    if (event.target.id == "closePopup") {
      this.show = false;
    }
  }
}
