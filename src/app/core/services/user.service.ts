import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, delay } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http: HttpClient = inject(HttpClient);

  retrieveAll = (): Observable<User[]> => {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      delay(3000)
    );
  };
}
