import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent  implements OnInit {


  categoryForm: FormGroup;
  
  @Input() set show(value: any) {
    this.categoryForm.reset();
    this.categoryForm.markAsUntouched();
    this.showWindow = value;
  }

  showWindow: boolean = false;
  @Input() idProject!: string;
  @Input() set categoryEdit(value: any) {
    this.category = value;
    if (value == undefined) {
      return;
    }
    console.log(value)
    this.categoryForm.get("name")?.patchValue(value.name);
    this.categoryForm.get("color")?.patchValue(value.color);
    this.categoryForm.get("order")?.patchValue(value.order);
  };;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();

  category: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private userSVC: UserService,
    private dashboardSVC: DashboardService,
    private router: Router
    
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      color: ['',[Validators.required]],
      order: [0]
    });
  }

  ngOnInit() {}

  createProject() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }
    if (!this.categoryForm.value.color.includes("#")) {
      this.categoryForm.get('color')?.patchValue("#"+this.categoryForm.value.color)
    }
    let params: any = {
      name: this.categoryForm.value.name,
      color: this.categoryForm.value.color,
      project: this.idProject
    }
    if (this.category) {
      params.order = this.categoryForm.value.order;
      this.dashboardSVC.updateCategory(params,this.category._id).subscribe(
        (el: any) => {
          console.log("Category updated",el)
          if (!el) {
            return;
          }
          this.categoryForm.reset();
          this.categoryForm.markAsUntouched();
          this.closePopup.emit();
        }
      )
    } else {
      this.dashboardSVC.createCategory(params).subscribe(
        (el: any) => {
          console.log("Category created",el)
          if (!el) {
            return;
          }
          this.categoryForm.reset();
          this.categoryForm.markAsUntouched();
          this.closePopup.emit();
        }
      )
    }
  } 

  close(event: any) {
    if (event.target.id == 'closePopup') {
      this.categoryForm.reset();
      this.categoryForm.markAsUntouched();
      this.closePopup.emit(true);
    }
  }

}
