import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthcGuard {

  constructor(
    private authService: AuthService, 
    private tokenService: TokenService,
    private router: Router
    ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const url: string = state.url;

    return this.checkLogin();
  }

  async checkLogin(): Promise<boolean> {
    const loggedIn = await this.authService.isLoggedIn()
    if (!loggedIn) {
      return this.router.navigateByUrl("/")
    }
    return loggedIn;
  }


}