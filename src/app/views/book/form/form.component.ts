import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';
import { BookActions } from '../../../core/stores/book/actions/book.actions';
import { Book } from '../../../core/models/book.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  store: Store = inject(Store);
  actionsSubject: ActionsSubject = inject(ActionsSubject);
  fb: FormBuilder = inject(FormBuilder);

  form = this.fb.group({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.actionsSubject
    .pipe(
      ofType(BookActions.updateBookSuccess,BookActions.addBookSuccess)
    )
    .subscribe(()=> this.form.reset())
  }

  onSubmit = () => {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    const bookId = this.form.value.id;
    if (!!bookId)
      this.store.dispatch(
        BookActions.updateBook({ book: this.form.value as unknown as Book })
      );
    else
      this.store.dispatch(
        BookActions.addBook({ book: this.form.value as unknown as Book })
      );
  };
}
