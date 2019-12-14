import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Book } from '../../models/book';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit, OnChanges {

  @Input() book: Book;

  @Output() save = new EventEmitter<Book>();

  bookForm: FormGroup;

  private model: Book = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.bookForm = this.fb.group({
      isbn: [this.book.isbn, Validators.required],
      title: [this.book.title, Validators.required],
      authors: this.fb.array([]),
      categories: this.fb.array([]),
    }, { validators: this.authorEmptyValidator });
    if (this.book) {
      this.updateModel(this.book);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.bookForm && changes.book && changes.book.currentValue) {
      console.log('update book form', changes.book.currentValue);
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
      this.save.emit(this.bookForm.value);
    }
  }

  reset() {
    this.updateModel(this.book);
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

  private updateModel(newModel) {
    this.model = Object.assign({}, this.model, newModel);
    this.bookForm.patchValue({
      isbn: this.model.isbn,
      title: this.model.title
    });
    this.authors.controls = [];
    this.model.authors.forEach(author => {
      const controls = this.authors.controls.map(c => c.value);
      const exist = controls.indexOf(author.name);
      if (exist > -1) {
        this.authors.at(exist).setValue(author.name);
      } else {
        this.authors.push(this.fb.control(author.name, Validators.required));
      }
    });
    this.categories.controls = [];
    this.model.categories.forEach(category => {
      const controls = this.categories.controls.map(c => c.value);
      const exist = controls.indexOf(category);
      if (exist > -1) {
        this.categories.at(exist).setValue(category);
      } else {
        this.categories.push(this.fb.control(category, Validators.required));
      }
    });
  }

  private authorEmptyValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const authors = control.get('authors');
    return authors.valid ? null : { previousAuthorInvalid: true };
  }

}
