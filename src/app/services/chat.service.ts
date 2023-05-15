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

  getProjectChats(id: any): Observable<any> {
    return this.http.get(environment.backendUrl + "client/project/"+id, this.authSVC.getAuthHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }

  getAllChats(): Observable<any> {
    return this.http.get(environment.backendUrl + "client/allChats", this.authSVC.getAuthHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }

  getChats(): Observable<any> {
    return this.http.get(environment.backendUrl + "client/mychats", this.authSVC.getAuthHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }

  getChat(chat: string): Observable<any> {
    return this.http.get(environment.backendUrl + "client/chat/"+chat, this.authSVC.getAuthHeader())
    .pipe(
      tap( res => res),
      catchError(() => of(false))
    );
  }

  newChat(params: any): Observable<any> {
    return this.http.post(environment.backendUrl + "client/newchat", JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    )
  }

  newMessage(params: any): Observable<any> {
    return this.http.post(environment.backendUrl + "client/sendmessage", JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    )
  }

  markAsRead(id: any): Observable<any> {
    return this.http.put(environment.backendUrl + "client/markAsRead/"+id, JSON.stringify({}), this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    )
  }

  resolveChat(id: any): Observable<any> {
    return this.http.put(environment.backendUrl + "client/resolve/"+id, JSON.stringify({}), this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    )
  }

  updateChat(params: any, id: any): Observable<any> {
    return this.http.put(environment.backendUrl + "client/update/"+id, JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of(false))
    )
  }
}
