import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent  implements OnInit {

  projects: any[] = [];
  name: string = "";
  constructor(
    private projectSVC: ProjectService,
    private userSVC: UserService
  ) {
    this.userSVC.getActualUser().subscribe(
      (user: any) => {
        this.name = user.data.employee.name
      }
    )
  }

  ngOnInit() {
    this.projectSVC.getProjects().subscribe(
      (el: any) => {
        this.projects = el.data
        /*
        this.projects = this.projects.sort((pr: any, pr2: any) => {
          return pr2.created?<any>new Date(pr2.created):<any>new Date() - pr.created?<any>new Date(pr.created):<any>new Date()
        });
        */
      }
    )
  }

}
