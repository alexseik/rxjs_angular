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
    console.log('tessstt addAuthor')
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
    this.categories.controls = [];
    this.createOrUpdateControl(this.model, 'authors');
    this.createOrUpdateControl(this.model, 'categories');
  }

  private authorEmptyValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const authors = control.get('authors');
    return authors.valid ? null : { previousAuthorInvalid: true };
  }

  private createOrUpdateControl(model, propName) {
    model[propName].forEach(prop => {
      const controls = this.categories.controls.map(c => c.value);
      const exist = controls.indexOf(prop.name);
      if (exist > -1) {
        this.categories.at(exist).setValue(prop.name);
      } else {
        this.categories.push(this.fb.control(prop.name, Validators.required));
      }
    });
  }

}
