import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent  implements OnInit {

  idProject: string;
  idCategory: any;
  categories: any[] = [];
  tasks: any[] = [];
  show: boolean = false;
  showTask: boolean = false;
  
  categoryFilter: any;

  onRouting: any;

  taskForm: FormGroup = this.formBuilder.group({
    title: ["",[Validators.required]],
    description: ["",[Validators.required]]
  });

  constructor(
    private route: ActivatedRoute,
    private dashboardSVC: DashboardService,
    private router: Router,
    private userSVC: UserService,
    private formBuilder: FormBuilder
  ) {
    this.idProject = this.route.snapshot.paramMap.get('idProject')!;
    this.dashboardSVC.getCategories(this.idProject).subscribe(
      (el: any) => {
        console.log("CATEGORIES",el)
        this.categories = el.data;
        this.getTasks()
      }
    )
  }

  getTasks() {
    this.dashboardSVC.getTasks(this.idProject).subscribe(
      (el: any) => {
        this.mapTasks(el.data)
      }
    )
  }

  ngOnInit() {
    this.onRouting = this.router.events.subscribe(
      (el: any) => {
        if (el instanceof NavigationEnd) {
          this.getTasks()
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.onRouting.unsubscribe();
  }

  close(event: any) {
    if (event.target.id == "closePopup") {
      this.show = false;
    }
  }
  

  checkCategories(event: any) {
    this.show = false;
    if (event) {
      return
    }
    this.dashboardSVC.getCategories(this.idProject).subscribe(
      (el: any) => {
        this.categories = el.data;
        this.getTasks()
      }
    )
  }

  checkTask(event: any) {
    this.showTask = false;
    if (event) {
      return
    }
    this.dashboardSVC.getTasks(this.idProject).subscribe(
      (el: any) => {
        console.log(el)
        this.mapTasks(el.data)
      }
    )
  }

  newTask(idCategory: any) {
    this.idCategory = idCategory;
    this.showTask = true;
  }

  mapTasks(tasks: any[]) {
    this.categories.map(
      (categoria: any) => {
        categoria.filter = "date";
        categoria.tasks = [];
        tasks.forEach(
          (task: any) => {
            if (categoria._id == task.category._id) {
              categoria.tasks.push(task)
            }
          }
        )
        return categoria;
      }
    )
    console.log("Categories",this.categories)
  }

  calcHours(tracking: any) {
    if (tracking.length < 1) {
      return "00:00"
    }
    let totalHours: number = 0;
    tracking.forEach((track: any) => {
      if (track.endTrack) {
        totalHours += (new Date(track.endTrack).getTime() - new Date(track.startTrack).getTime())
      }
    });
    let ms = totalHours % 1000;
    totalHours = (totalHours - ms) / 1000
    let ss = totalHours % 60;
    totalHours = (totalHours - ss) / 60
    let mm = totalHours % 60;
    totalHours = (totalHours - mm) / 60
    let hh = totalHours % 24;
    let days = (totalHours - hh) / 24
    hh += days*24
    return (hh < 10 ? "0"+hh:hh)+":"+(mm < 10 ? "0"+mm:mm);
    
  }

  navigate(event: any, task: any) {
    this.router.navigateByUrl(this.router.url+"/"+task._id)
  }

  toggleFilter(category: any) {
    if (this.categoryFilter == category) {
      this.categoryFilter = undefined;
    } else {
      this.categoryFilter = category;
    }
  }

  setCategory(category: any, value: any) {
    if (category.filter == value) {
      category.filter = value+"d";
    } else {
      category.filter = value;
    }
  }

  checkCloseFilter(event: any) {
    console.log(event)
    if (event.target.id == "closeFilter") {
      this.categoryFilter = undefined;
    } 
  }

  createTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    let params: any = {
      title: this.taskForm.value.title,
      description:  this.taskForm.value.description,
      project:  this.idProject,
    }
    this.dashboardSVC.createErrorTask(params).subscribe(
      (el: any) => {
        if (!el) {
          return;
        }
        this.taskForm.reset()
        this.show = false;
        this.getTasks();
      }
    )
  } 

}
