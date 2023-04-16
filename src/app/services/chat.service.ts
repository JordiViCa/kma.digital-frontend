import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: HttpClient,
    private authSVC: AuthService
  ) { }

  getChats(client: string): Observable<any> {
    return this.http.get(environment.strapiUrl + "chats?filters[client]="+client, this.authSVC.getAuthHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }
  getChats2(): Observable<any> {
    return this.http.get(environment.strapiUrl + "chats?populate=client", this.authSVC.getAuthHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }
}
