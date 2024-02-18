import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly http: HttpClient = inject(HttpClient);

  retrieveAll = (): Observable<Book[]> => {
    return this.http.get<Book[]>(`${environment.apiUrl}/books`);
  };

  add = (book: Book): Observable<Book> => {
    const body: Book = { ...book, id: null };
    return this.http.post<Book>(`${environment.apiUrl}/books`, body);
  };

  update = (book: Book): Observable<Book> => {
    return this.http.put<Book>(`${environment.apiUrl}/books/${book.id}`, book);
  };

  delete = (id: number): Observable<{}> => {
    return this.http.delete<Book>(`${environment.apiUrl}/books/${id}`);
  };
}
