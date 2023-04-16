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

  projects: Project[] = [];
  name: string = "";
  constructor(
    private projectSVC: ProjectService,
    private userSVC: UserService
  ) {
    this.userSVC.getActualUser().subscribe(
      (user: any) => {
        if (user.client) {
          this.name = user.client.name + " " + user.client.surname
        }
      }
    )
  }

  ngOnInit() {
    this.projectSVC.getProjects().subscribe((el: Project[]) => {
      this.projects = el;
    })
  }

}
