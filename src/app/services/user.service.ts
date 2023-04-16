import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authSVC: AuthService
  ) { }

  createUser(params: any): Observable<any> {
    return this.http.post(environment.strapiUrl + "auth/local/register", JSON.stringify(params), this.authSVC.getHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }

  loginUser(params: any): Observable<any> {
    return this.http.post(environment.strapiUrl + "auth/local", JSON.stringify(params), this.authSVC.getHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }

  getActualUser(): Observable<any> {
    return this.http.get(environment.strapiUrl + "users/me?populate=*", this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    );
  }

  createClient(params: any): Observable<any> {
    return this.http.post(environment.strapiUrl + "clients?populate=*", JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }
  
}
