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
    console.log("Check")
    const loggedIn = await this.authService.isLoggedIn()
    console.log("next")
    return loggedIn;
  }


}