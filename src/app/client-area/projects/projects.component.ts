import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent  implements OnInit {

  projects: any[] = [];

  constructor(
    private projectSVC: ProjectService
  ) { }

  ngOnInit() {
    this.projectSVC.getProjects().subscribe((el: any) => {
      this.projects = el.data;
    })
  }

}
