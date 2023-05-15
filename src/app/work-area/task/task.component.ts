import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent  implements OnInit {

  idProject: any;
  idTask: any;
  task: any;
  idEmployee: any;
  confirmationDelete: boolean = false;
  deleteId: any;

  edit: string = "";
  title: string = "";
  category: string = "";
  difficulty: string = "";
  description: string = "";
  categories: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dashboardSVC: DashboardService,
    private userSVC: UserService
  ) { }

  ngOnInit() {
    this.idProject = this.route.snapshot.parent!.paramMap.get('idProject')!
    this.idTask = this.route.snapshot.paramMap.get('idTask')!
    this.getTask()
    this.userSVC.getActualUser().subscribe(
      (el: any) => {
        this.idEmployee = el.data.employee._id;
      }
    )
    this.dashboardSVC.getCategories(this.idProject).subscribe(
      (el: any) => {
        this.categories = el.data;
      }
    )
  }

  getTask() {
    this.dashboardSVC.getTask(this.idTask).subscribe(
      (el: any) => {
        if (!el) {
          let url = this.router.url.split('/'+this.idTask)[0];
          this.router.navigateByUrl(url);
          return;
        }
        this.title = el.data.title;
        this.category = el.data.category._id;
        this.description = el.data.description;
        this.difficulty = el.data.difficulty;
        this.task = el.data;
      }
    )
  }

  goBack(event: any) {
    if (event.target.id == "goBack") {
      let url = this.router.url.split('/'+this.idTask)[0];
      this.router.navigateByUrl(url);
    }
    if (event.target.id == "closeConfirmation") {
      this.confirmationDelete = false;
    }
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
      if (!track.endTrack && track.employee._id == this.idEmployee) {
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

  checkTracking(task: any, form: boolean) {
    if (task.tracking.length < 1) {
      return form;
    }
    let start = form;
    task.tracking.forEach((track: any) => {
      if (!track.endTrack && track.employee._id == this.idEmployee) {
        start = !form;
      }
    });
    return start;
  }

  getHours(task: any) {
    let total = new Date(task.endTrack).getTime() - new Date(task.startTrack).getTime();
    let ms = total % 1000;
    total = (total - ms) / 1000
    let ss = total % 60;
    total = (total - ss) / 60
    let mm = total % 60;
    total = (total - mm) / 60
    let hh = total % 24;
    let days = (total - hh) / 24
    hh += days*24
    return (hh < 10 ? "0"+hh:hh)+":"+(mm < 10 ? "0"+mm:mm) + (hh < 1 ? 'm':'h');
  }

  startStop(start: boolean) {
    if (start) {
      let params = {
        task: this.task._id
      }
      this.dashboardSVC.startTracking(params).subscribe(
        (el: any) => {
          this.getTask()
        }
      )
    } else {
      let id;
      this.task.tracking.forEach(
        (track: any) => {
          if (!track.endTrack && track.employee._id == this.idEmployee) {
            id = track._id
          }
        }
      )
      let params = {
        id: id
      }
      this.dashboardSVC.stopTracking(params).subscribe(
        (el: any) => {
          this.getTask()
        }
      )
    }
  }

  deleteTask(id: any) {
    if (!this.confirmationDelete) {
      this.confirmationDelete = true;
      this.deleteId = id;
      return;
    }
    this.dashboardSVC.deleteTracking(this.deleteId).subscribe(
      (el: any) => {
        if (!el) {
          return;
        }
        this.confirmationDelete = false;
        this.deleteId = "";
        this.getTask();
      }
    )
  }

  saveContents(event: any) {
    if (event.target.id == "title") {
      this.title = event.target.innerText.replace(/(<.*?>){1,}/gm,"").replace(/\n/gm,"");
      if (event.target.innerText != this.title) {
       event.target.innerText = this.title;
      }
    }
    if (event.target.id == "description") {
      this.description = event.target.innerText;
    }
    this.saveTask();
  }
  
  saveTask() {
    let params: any = {}
    let edited = false;
    if (this.title != this.task.title) {
      params.title = this.title;
      edited = true;
    }
    if (this.description != this.task.description) {
      params.description = this.description;
      edited = true;
    }
    if (this.category != this.task.category._id && this.existsCategory()) {
      params.category = this.category;
      edited = true;
    }
    if (this.difficulty != this.task.difficulty && Number(this.difficulty) > 0 && Number(this.difficulty) < 6) {
      params.difficulty = this.difficulty;
      edited = true;
    }
    if (edited) {
      this.dashboardSVC.editTask(params,this.task._id).subscribe(
        (el: any) => {
          if (!el) {
            return;
          }
          this.getTask();
        }
      )
    }
  }

  existsCategory() {
    let cont = false;
    this.categories.forEach(
      (category: any) => {
      if (this.category == category._id) {
        cont = true;
      }
    });
    return cont;
  }

}
