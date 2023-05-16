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
    domain: ["",[Validators.required]],
    client: ["",[Validators.required]],
    public: ["",[Validators.required]],
    image: ["",[]]
  });

  search: any = setTimeout(() => {}, 0);
  clients: any[] = [];
  clientSelected: boolean = false;
  client: any;

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
          domain: this.project.domain,
          client: this.project.client.name + " " + this.project.client.surname + " - " + this.project.client.cif,
          public: this.project.public,
          image: this.project.image ?? ''
        });
        this.editForm.get("client")?.valueChanges.subscribe(
          (value: any) => {
            clearTimeout(this.search)
            this.search = setTimeout(() => {
              if (!this.clientSelected) {
                this.userSVC.searchFiveClients(value).subscribe(
                  (el: any) => {
                    this.clients = el.data;
                  }
                )
              }
            }, 1000)
          }
        );
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
    if (this.project.client.name + " " + this.project.client.surname + " - " + this.project.client.cif != this.editForm.value.client) {
      if (this.project.client._id != this.client._id) {
        params.client = this.client._id
      }
    }
    if (this.project.public != this.editForm.value.public) {
      params.public = this.editForm.value.public
    }
    if (this.project.image != this.editForm.value.image) {
      params.image = this.editForm.value.image
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

  selectClient(client: any) {
    this.clientSelected = true;
    this.client = client;
    console.log(this.client)
    this.editForm.get("client")?.patchValue(client.name + " " + client.surname + " - " + client.cif);
    this.editForm.get("client")?.disable();
  }

  unselectClient() {
    this.clients = [];
    this.client = {};
    this.clientSelected = false;
    this.editForm.get("client")?.patchValue('');
    this.editForm.get("client")?.markAsUntouched();
    this.editForm.get("client")?.enable();
  }

}
