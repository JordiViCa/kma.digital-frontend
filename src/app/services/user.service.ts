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
    return this.http.post(environment.backendUrl + "auth/register", JSON.stringify(params), this.authSVC.getHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }

  loginUser(params: any): Observable<any> {
    return this.http.post(environment.backendUrl + "auth/login", JSON.stringify(params), this.authSVC.getHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }

  getActualUser(): Observable<any> {
    return this.http.get(environment.backendUrl + "auth/me", this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    );
  }

  createClient(params: any): Observable<any> {
    return this.http.post(environment.backendUrl + "auth/client", JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }

  updateClient(params: any): Observable<any> {
    return this.http.put(environment.backendUrl + "auth/client", JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }

  searchFiveClients(text: any): Observable<any> {
    return this.http.get(environment.backendUrl + "auth/client/"+text, this.authSVC.getAuthHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }
  
  updateEmployee(params: any): Observable<any> {
    return this.http.put(environment.backendUrl + "auth/employee", JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap( res => res)
    );
  }

  changePassword(params: any): Observable<any> {
    return this.http.put(environment.backendUrl + "auth/changepassword", JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap( res => res)
    );
  }

  createWorker(params: any): Observable<any> {
    return this.http.post(environment.backendUrl + "auth/employee", JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }
  
}
