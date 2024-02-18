import { InMemoryDbService } from 'angular-in-memory-web-api'
import { User } from '../../core/models/user.model';
import { Book } from '../../core/models/book.model';

export class Data implements InMemoryDbService {
  createDb(): Record<string, User[] | Book[]> {
    const users: User[] = [
      {
        id: 1,
        username: 'Derrick Dev',
        isAdmin: true,
      },
      {
        id: 2,
        username: 'Tobi Orphée',
        isAdmin: false,
      },
      {
        id: 3,
        username: 'Bonheur Rosaire',
        isAdmin: true,
      },
    ];
    const books: Book[] = [
      {
        id: 1,
        name: 'Le Dilemme',
        author: 'Tidjani Serpos',
        publisher: 'LAHA Production',
      },
    ];
    return { users, books };
  }
  genId = (books: Book[]):number  =>{
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
  }
}