import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Book } from '../../models/book';
import { BooksService } from '../../services/books.service';
import * as actions from '../../store/actions';
import { BooksState } from '../../store/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormComponent implements OnInit, OnChanges {

  @Input() book: Book;

  @Output() save = new EventEmitter<Book>();

  bookForm: FormGroup;

  private model: Book = null;

  constructor(private fb: FormBuilder, private store: Store<BooksState>) { }

  ngOnInit() {
    this.bookForm = this.fb.group({
      isbn: [this.book.isbn, Validators.required],
      title: [this.book.title, Validators.required],
      authors: this.fb.array([]),
      categories: this.fb.array([]),
    }, { validators: this.authorEmptyValidator });
    if (this.book) {
      this.reset();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.bookForm && changes.book && changes.book.currentValue) {
      this.updateModel(changes.book.currentValue);
      this.bookForm.patchValue(this.model);
    }
  }

  get authors() {
    return this.bookForm.get('authors') as FormArray;
  }

  get categories() {
    return this.bookForm.get('categories') as FormArray;
  }

  submit() {
    if (this.bookForm.valid) {
      this.updateModel(this.bookForm.value);
      // this.booksService.saveBook(this.model);
      this.store.dispatch(actions.saveBook({ book: this.model }))
      this.save.emit(this.model);
    }
  }

  reset() {
    this.model = Object.assign({ id: null }, this.model, this.book);
    this.bookForm.patchValue({
      isbn: this.model.isbn,
      title: this.model.title
    });
    this.authors.controls = [];
    this.categories.controls = [];
    this.createOrUpdateControl(this.model, 'authors');
    // this.createOrUpdateControl(this.model, 'categories');
    this.book.categories.forEach(c => {
      this.categories.push(this.fb.control(c, Validators.required));
    });
  }

  addAuthor() {
    this.authors.push(this.fb.control('', Validators.required));
  }

  addCategory() {
    this.categories.push(this.fb.control('', Validators.required));
  }

  clearAuthor(i: number) {
    this.authors.controls.splice(i, 1);
  }

  clearCategory(i: number) {
    this.categories.controls.splice(i, 1);
  }

  private updateModel(formValue: any) {
    const newModel: any = {};
    if (this.book) {
      const originalAuthors = this.book.authors ? this.book.authors : [];
      const formAuthors = formValue.authors ? formValue.authors : [];
      const updatedAuthors = formAuthors.map((author, index) => {
        if (index < originalAuthors.length) {
          return Object.assign({}, originalAuthors[index], { name: author });
        }
        return { name: author };
      });
      newModel.authors = updatedAuthors;
      const formCategories = formValue.categories ? formValue.categories : [];
      const updatedCategories = formCategories;
      newModel.categories = updatedCategories;
    }
    newModel.isbn = formValue.isbn;
    newModel.title = formValue.title;
    this.model = Object.assign({ id: null }, this.model, newModel);
  }

  private authorEmptyValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const authors = control.get('authors');
    return authors.valid ? null : { previousAuthorInvalid: true };
  }

  private createOrUpdateControl(model, propName) {
    model[propName].forEach(prop => {
      const controls = this[propName].controls.map(c => c.value);
      const exist = controls.indexOf(prop.name);
      if (exist > -1) {
        this[propName].at(exist).setValue(prop.name);
      } else {
        this[propName].push(this.fb.control(prop.name, Validators.required));
      }
    });
  }

}
