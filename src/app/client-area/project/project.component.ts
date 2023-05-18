import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent  implements OnInit {

  project: any;

  editForm: FormGroup  = this.formBuilder.group({
    name: ["",[Validators.required]],
    domain: ["",[Validators.required]]
  });


  constructor(
    private projectSVC: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userSVC: UserService
  ) { }

  ngOnInit() {
    this.projectSVC.getProject(this.route.snapshot.paramMap.get('idProject')!).subscribe(
      (project: any) => {
        this.project = project.data;
        this.editForm.patchValue({
          name: this.project.name,
          domain: this.project.domain
        });
      }
    )
  }

  sendForm() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    let params: any = {}
    if (this.project.name != this.editForm.value.name) {
      params.name = this.editForm.value.name
    }
    if (this.project.domain != this.editForm.value.domain) {
      params.domain = this.editForm.value.domain
    }
    this.projectSVC.updateProject(params, this.project._id).subscribe(
      (project: any) => {
        if (!project) {
          return;
        }
        console.log(this.project)
        this.project = project.data;
      }
    )
  }

}
