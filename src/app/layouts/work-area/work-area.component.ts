import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss'],
})
export class WorkAreaComponent  implements OnInit {

  menuToggled: boolean = false;
  toggleLogin: boolean = false;
  actualroute: string = "";
  secondNav: string = "";
  idProject: string|null = "";

  constructor(
    private router: Router, 
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.actualroute = this.route.firstChild!.snapshot.data['nav']
    this.secondNav = this.route.firstChild!.snapshot.data['secondnav'];
    this.idProject = this.route.firstChild!.snapshot.paramMap.get('idProject');
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(
      (el: any) => {
        console.log("a")
        this.actualroute = this.route.firstChild!.snapshot.data['nav'];
        this.secondNav = this.route.firstChild!.snapshot.data['secondnav'];
        this.idProject = this.route.firstChild!.snapshot.paramMap.get('idProject');
        console.log(this.route.snapshot)
      }
    );
  }

  hideMenu(event: any) {
    if (event.target.id == "closePopup") {
      this.menuToggled = false;
    }
  }

}
