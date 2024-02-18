import { Component, OnInit, Signal, inject } from '@angular/core';
import { BookActions }  from '../../core/stores/book/actions/book.actions'
import { Book } from '../../core/models/book.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { merge, startWith, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../core/stores/book/reducers/book.reducer';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { CommonModule } from '@angular/common';
import { ErrorType } from '../../shared/constantes/error.contante';
import { getError } from '../../core/stores/book/selectors/book.selectors';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, ListComponent, FormComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  store: Store<State> = inject(Store);

  errorMessage: Signal<ErrorType | undefined> = toSignal(this.store.select(getError));

  ngOnInit(): void {
    this.store.dispatch(BookActions.loadBooks());
  }
}
