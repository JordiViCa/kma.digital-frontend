import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient,
    private authSVC: AuthService
  ) { }

  getProjects(): Observable<any> {
    return this.http.get(environment.backendUrl + "projects", this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    );
  }

  getProject(id: any): Observable<any> {
    return this.http.get(environment.backendUrl + "projects/"+id, this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    );
  }

  createProject(params: any): Observable<any> {
    return this.http.post(environment.backendUrl + "projects", JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }

  updateProject(params: any, id: any): Observable<any> {
    return this.http.put(environment.backendUrl + "projects/"+id, JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }

  searchFiveProjects(text: any): Observable<any> {
    return this.http.get(environment.backendUrl + "projects/getfive/"+text, this.authSVC.getAuthHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }

  getPublished(): Observable<any> {
    return this.http.get(environment.backendUrl + "projects/published/all")
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }
}
