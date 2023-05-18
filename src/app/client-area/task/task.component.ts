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
    private dashboardSVC: DashboardService
  ) { }

  ngOnInit() {
    this.idProject = this.route.snapshot.parent!.paramMap.get('idProject')!
    this.idTask = this.route.snapshot.paramMap.get('idTask')!
    this.getTask()
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
        console.log(el)
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

}
