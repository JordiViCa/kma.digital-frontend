import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: any;

  constructor(
    private http: HttpClient,
    private tokenSVC: TokenService
  ) { }

  async isLoggedIn(work: boolean = false): Promise<boolean> {
    return new Promise(resolve => this.getActualUser().subscribe(
      (el: any) => {
        if (!el) {
          resolve(false)
        }
        if (work) {
          resolve(el.data.employee != null);
        } else {
          resolve(el.data.employee == null)
        }
      }
    ));
  }

  private getActualUser(): Observable<any> {
    return this.http.get(environment.backendUrl + "auth/me", this.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    );
  }

  getPersistedToken(): string {
    return this.tokenSVC.getToken() || '';
  }

  getAuthHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getPersistedToken()}`
      })
    }
  }

  getHeader() {
    return {headers: {'content-type': 'application/json'}}
  }
}
