import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client-area',
  templateUrl: './client-area.component.html',
  styleUrls: ['./client-area.component.scss'],
})
export class ClientAreaComponent  implements OnInit {

  menuToggled: boolean = false;
  toggleLogin: boolean = false;
  actualroute: string = "";
  disableAll: boolean = false;
  secondNav: string = "";
  idProject: string = "";

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private userSVC: UserService
  ) {
    this.userSVC.getActualUser().subscribe(
      (user: any) => {
        console.log("USER",user)
        if (!user.data.client) { 
          this.disableAll = true;
          this.router.navigate(['/client/completeRegister']);
        }
      }
    )
  }

  ngOnInit() {
    this.actualroute = this.route.firstChild!.snapshot.data['nav']
    this.secondNav = this.route.firstChild!.snapshot.data['secondnav'];
    this.idProject = this.route.firstChild!.snapshot.paramMap.get('idProject')!;
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(
      (el: any) => {
        console.log(this.route)
        if (this.disableAll == true) {
          this.userSVC.getActualUser().subscribe(
            (user: any) => {
              console.log("USER",user)
              if (!user.data.client) { 
                this.disableAll = true;
                this.router.navigate(['/client/completeRegister']);
              } else {
                this.disableAll = false;
              }
            }
          )
        }
        this.actualroute = this.route.firstChild!.snapshot.data['nav']
        this.secondNav = this.route.firstChild!.snapshot.data['secondnav'];
        this.idProject = this.route.firstChild!.snapshot.paramMap.get('idProject')!;
      }
    );
  }

  hideMenu(event: any) {
    if (event.target.id == "closePopup") {
      this.menuToggled = false;
    }
  }

  tLogin() {
    // Mirar si sessio, sino mostrar login
    this.menuToggled = false;
    this.toggleLogin = true;
  }

}
