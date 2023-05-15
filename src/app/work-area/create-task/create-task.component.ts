import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent  implements OnInit {


  taskForm: FormGroup;
  
  @Input() show: boolean = true;
  @Input() idProject!: string;
  @Input() idCategory!: string;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private formBuilder: FormBuilder,
    private userSVC: UserService,
    private dashboardSVC: DashboardService,
    private router: Router
    
  ) {
    this.taskForm = this.formBuilder.group({
      title: ["",[Validators.required]],
      description: ["",[Validators.required]],
      difficulty: ["",[Validators.required, Validators.pattern(/^[12345]$/)]]
    });
  }

  ngOnInit() {}

  createTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    let params: any = {
      title: this.taskForm.value.title,
      description:  this.taskForm.value.description,
      difficulty:  this.taskForm.value.difficulty,
      project:  this.idProject,
      category:  this.idCategory,
    }
    this.dashboardSVC.createTask(params).subscribe(
      (el: any) => {
        console.log("Task created",el)
        if (!el) {
          return;
        }
        this.taskForm.reset()
        this.closePopup.emit();
      }
    )
  } 

  close(event: any) {
    if (event.target.id == 'closePopup') {
      this.taskForm.reset()
      this.closePopup.emit(true);
    }
  }

}
