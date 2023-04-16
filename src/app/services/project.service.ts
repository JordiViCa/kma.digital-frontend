import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  getProjects(): Observable<any> {
    return of([
      {
        name: 'stayfit',
        id: '1'
      },
      {
        name: 'loremipsum',
        id: '2'
      },
      {
        name: 'defaultnames',
        id: '3'
      }
    ])
  }

  getProject(id: any): Observable<any> {
    return of(false)
  }
}
