var books = require('./books.json');
var authors = require('./authors.json');
var users = require('./users.json');

module.exports = function () {
  return {
    books,
    authors,
    users
  };
};
