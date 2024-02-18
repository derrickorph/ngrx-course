import { Component, inject, Input, OnInit, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookActions } from '../../../core/stores/book/actions/book.actions';
import { Book } from '../../../core/models/book.model';
import { CommonModule } from '@angular/common';
import { getBooks } from '../../../core/stores/book/selectors/book.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  store: Store = inject(Store);

  @Input() bookForm: FormGroup; 

  books: Signal<Book[] | undefined> = toSignal(this.store.select(getBooks));

  deleteBook = (id:number): void => {
    this.store.dispatch(BookActions.deleteBook({id}))
  }
  editBook = (book:Book): void => {
    this.bookForm.patchValue({
      id: book.id,
      name: book.name,
      author: book.author,
      publisher: book.publisher,
    })
  }
}
