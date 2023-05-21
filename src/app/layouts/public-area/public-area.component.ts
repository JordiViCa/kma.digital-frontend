import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-public-area',
  templateUrl: './public-area.component.html',
  styleUrls: ['./public-area.component.scss'],
})
export class PublicAreaComponent  implements OnInit {

  menuToggled: boolean = false;
  toggleLogin: boolean = environment.apk;
  apk: boolean = environment.apk;
  actualroute: string = "";

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.actualroute = this.route.firstChild!.snapshot.data['nav']
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(
      (el: any) => {
        console.log("a")
        this.actualroute = this.route.firstChild!.snapshot.data['nav'];
      }
    );
  }

  hideMenu(event: any) {
    if (event.target.id == "closePopup") {
      this.menuToggled = false;
    }
  }

  tLogin() {
    if (environment.apk) {
      return;
    }
    // Mirar si sessio, sino mostrar login
    this.menuToggled = false;
    this.toggleLogin = true;
  }

}
