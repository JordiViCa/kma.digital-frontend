import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent  implements OnInit {

  projectForm: FormGroup;
  search: any = setTimeout(() => {}, 0);
  clients: any[] = [];
  clientSelected: boolean = false;
  client: any;
  
  @Input() show: boolean = false;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private formBuilder: FormBuilder,
    private userSVC: UserService,
    private projectSVC: ProjectService,
    private router: Router
    
  ) {
    this.projectForm = this.formBuilder.group({
      name: ["",[Validators.required]],
      domain: ["",[Validators.required]],
      client: ["",[Validators.required]],
    });

    this.projectForm.get("client")?.valueChanges.subscribe(
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

  ngOnInit() {}

  createProject() {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }
    let params: any = {
      name: this.projectForm.value.name,
      domain: this.projectForm.value.domain,
      client: this.client._id
    }
    this.projectSVC.createProject(params).subscribe(
      (el: any) => {
        console.log("Project created",el)
        if (!el) {
          return;
        }
        this.router.navigateByUrl('/work/projects/'+el.data._id)
      }
    )
  }

  selectClient(client: any) {
    this.clientSelected = true;
    this.client = client;
    console.log(this.client)
    this.projectForm.get("client")?.patchValue(client.name + " " + client.surname + " - " + client.cif);
    this.projectForm.get("client")?.disable();
  }

  unselectClient() {
    this.clients = [];
    this.client = {};
    this.clientSelected = false;
    this.projectForm.get("client")?.patchValue('');
    this.projectForm.get("client")?.markAsUntouched();
    this.projectForm.get("client")?.enable();
  }

  close(event: any) {
    if (event.target.id == 'closePopup') {
      this.projectForm.reset()
      this.unselectClient()
      this.closePopup.emit(true);
    }
  }
}
