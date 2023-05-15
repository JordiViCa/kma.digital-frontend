import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
    private authSVC: AuthService
  ) { }

  getCategories(id: any): Observable<any> {
    return this.http.get(environment.backendUrl + "dashboard/categories/"+id, this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    );
  }


  createCategory(params: any): Observable<any> {
    return this.http.post(environment.backendUrl + "dashboard/categories", JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    );
  }

  updateCategory(params: any, id: any): Observable<any> {
    return this.http.put(environment.backendUrl + "dashboard/categories/"+id, JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    );
  }

  getTasks(id: any): Observable<any> {
    return this.http.get(environment.backendUrl + "dashboard/tasks/"+id, this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    );
  }
  
  getTask(id: any): Observable<any> {
    return this.http.get(environment.backendUrl + "dashboard/task/"+id, this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    );
  }

  createTask(params: any): Observable<any> {
    return this.http.post(environment.backendUrl + "dashboard/task", JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    );
  }

  editTask(params: any,id: any): Observable<any> {
    return this.http.put(environment.backendUrl + "dashboard/task/"+id, JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    );
  }

  startTracking(params: any): Observable<any> {
    return this.http.post(environment.backendUrl + "dashboard/track", JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    );
  }

  stopTracking(params: any): Observable<any> {
    return this.http.put(environment.backendUrl + "dashboard/track", JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    );
  }

  deleteTracking(id: any): Observable<any> {
    return this.http.delete(environment.backendUrl + "dashboard/track/"+id, this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    );
  }

}
