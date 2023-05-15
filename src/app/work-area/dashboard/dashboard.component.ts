import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit, OnDestroy {

  idProject: string;
  idCategory: any;
  categories: any[] = [];
  tasks: any[] = [];
  showCat: boolean = false;
  showTask: boolean = false;
  idEmployee: any;

  categoryEdit: any;
  categoryFilter: any;

  onRouting: any;

  constructor(
    private route: ActivatedRoute,
    private dashboardSVC: DashboardService,
    private router: Router,
    private userSVC: UserService
  ) {
    this.idProject = this.route.snapshot.paramMap.get('idProject')!;
    this.dashboardSVC.getCategories(this.idProject).subscribe(
      (el: any) => {
        this.categories = el.data;
        this.getTasks()
      }
    )
    this.userSVC.getActualUser().subscribe(
      (el: any) => {
        this.idEmployee = el.data.employee._id;
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
  

  checkCategories(event: any) {
    this.showCat = false;
    this.categoryEdit = undefined;
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
    let now = new Date();
    let totalHours: number = 0;
    let tr: any;
    let start = true;
    tracking.forEach((track: any) => {
      if (!track.endTrack && track.employee == this.idEmployee) {
        start = false;
        tr = track;
      } else {
        totalHours += (new Date(track.endTrack).getTime() - new Date(track.startTrack).getTime())
      }
    });
    if (tr) {
      let a = now.getTime()
      let b = new Date(tr.startTrack).getTime();

      let diff = Math.abs(a - b);

      let ms = diff % 1000;
      diff = (diff - ms) / 1000
      let ss = diff % 60;
      diff = (diff - ss) / 60
      let mm = diff % 60;
      diff = (diff - mm) / 60
      let hh = diff % 24;
      let days = (diff - hh) / 24
      hh += days*24
      return (hh < 10 ? "0"+hh:hh)+":"+(mm < 10 ? "0"+mm:mm);
    } else {
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
    
  }

  navigate(event: any, task: any, start: boolean) {
    if (event.target.id == "track") {
      console.log("Track")
      if (start) {
        let params = {
          task: task._id
        }
        this.dashboardSVC.startTracking(params).subscribe(
          (el: any) => {
            console.log("Start tracking", el)
            this.getTasks()
          }
        )
      } else {
        let id;
        task.tracking.forEach(
          (track: any) => {
            if (!track.endTrack && track.employee == this.idEmployee) {
              id = track._id
            }
          }
        )
        let params = {
          id: id
        }
        console.log(params)
        this.dashboardSVC.stopTracking(params).subscribe(
          (el: any) => {
            console.log("End tracking", el)
            this.getTasks()
          }
        )
      }
    } else {
      this.router.navigateByUrl(this.router.url+"/"+task._id)
    }
  }

  checkTracking(task: any, form: boolean) {
    if (task.tracking.length < 1) {
      return form;
    }
    let start = form;
    task.tracking.forEach((track: any) => {
      if (!track.endTrack && track.employee == this.idEmployee) {
        start = !form;
      }
    });
    return start;
  }

  editCategory(category: any) {
    this.showCat = true;
    this.categoryEdit = category;
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

}
