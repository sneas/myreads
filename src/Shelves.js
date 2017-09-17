import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'

class Shelves extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookUpdate: PropTypes.func.isRequired,
  }

  render() {
    const shelves = [{
      id: 'currentlyReading',
      title: 'Currently Reading',
    }, {
      id: 'wantToRead',
      title: 'Want to Read',
    }, {
      id: 'read',
      title: 'Read',
    }]

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.props.books.length > 0 && shelves.map(shelf => (
              <div key={shelf.id} className="bookshelf">
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                  <BooksGrid
                      books={this.props.books.filter(book => book.shelf === shelf.id)}
                      onBookUpdate={this.props.onBookUpdate}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Shelves;