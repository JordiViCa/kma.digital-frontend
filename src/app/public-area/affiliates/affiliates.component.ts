import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-affiliates',
  templateUrl: './affiliates.component.html',
  styleUrls: ['./affiliates.component.scss'],
})
export class AffiliatesComponent  implements OnInit {

  projects: any[] = [];
  contactForm: FormGroup = this.formBuilder.group({
    title: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    name: ["", [Validators.required]],
    message: ["", [Validators.required]],
  });;

  constructor(
    private projectSVC: ProjectService,
    private formBuilder: FormBuilder,
    private contactSVC: ContactService
  ) { }

  ngOnInit() {
    this.projectSVC.getPublished().subscribe(
      (el: any) => {
      let pack: any[] = [];
      el.data.forEach(
       (project: any, index: any) => {
        if (index % 6 == 0 && index != 0) {
          this.projects.push(pack)
          pack = [];
        }
        pack.push(project)
        if (index == el.data.length-1) {
          this.projects.push(pack)
        }
      });
      console.log(this.projects)
    });
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
        console.log(el)
      }
    )
  }
}
