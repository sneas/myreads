import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BooksGrid extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookUpdate: PropTypes.func.isRequired,
  }

  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map(book => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                  <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={event => this.props.onBookUpdate(book, event.target.value)}>
                      <option disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors && (
                    <div className="book-authors">{book.authors.join(', ')}</div>
                )}
              </div>
            </li>
        ))}
      </ol>
    );
  }
}

export default BooksGrid;