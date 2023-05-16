import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient,
    private authSVC: AuthService
  ) { }

  createContact(params: any): Observable<any> {
    return this.http.post(environment.backendUrl + "contact", JSON.stringify(params), this.authSVC.getHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    )
  }

  getContact(): Observable<any> {
    return this.http.get(environment.backendUrl + "contact", this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    )
  }

  markAsSeen(id: any): Observable<any> {
    return this.http.put(environment.backendUrl + "contact/"+id, JSON.stringify({}), this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    )
  }
}
