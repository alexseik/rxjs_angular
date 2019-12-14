import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root'
})
export class InMemoryBooksService implements InMemoryDbService {
  createDb() {
    const users = [
      {
        name: 'user 1'
      }, {
        name: 'user 2'
      }
    ];
    const books = [
      {
        isbn: '12341234',
        title: 'libro 1',
        language: 'spanish',
        authors: ['1', '2'],
        categories: [
          'sfy',
        ]
      }, {
        isbn: '22341234',
        title: 'libro 2',
        language: 'spanish',
        authors: ['5', '3'],
        categories: [
          'sfy',
          'kids'
        ]
      }, {
        isbn: '32341234',
        title: 'libro 3',
        language: 'spanish',
        authors: ['6', '4'],
        categories: [
          'romance',
        ]
      }, {
        isbn: '42341234',
        title: 'libro 4',
        language: 'spanish',
        authors: ['9'],
        categories: [
          'story',
          'kids'
        ]
      }, {
        isbn: '52341234',
        title: 'libro 5',
        language: 'spanish',
        authors: ['7'],
        categories: [
          'text'
        ]
      }
    ];
    const authors = [
      {
        id: '1',
        name: 'author 1',
        categories: ['kids'],
      },
      {
        id: '2',
        name: 'author 2',
        categories: ['kids'],
      },
      {
        id: '3',
        name: 'author 3',
        categories: ['kids'],
      },
      {
        id: '4',
        name: 'author 4',
        categories: ['kids'],
      },
      {
        id: '5',
        name: 'author 5',
        categories: ['kids'],
      },
      {
        id: '6',
        name: 'author 6',
        categories: ['kids'],
      },
      {
        id: '7',
        name: 'author7',
        categories: ['kids'],
      },
      {
        id: '8',
        name: 'author 8',
        categories: ['kids'],
      },
      {
        id: '9',
        name: 'author 9',
        categories: ['kids'],
      },
      {
        id: '10',
        name: 'author 10',
        categories: ['kids'],
      }
    ];
    return { books, authors, users };
  }
}
