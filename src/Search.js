import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import debounce from 'debounce'
import BooksGrid from './BooksGrid'
import NProgress from 'nprogress'

class Search extends Component {
  static propTypes = {
    onBookUpdate: PropTypes.func.isRequired,
    shelfBooks: PropTypes.array.isRequired
  }

  state = {
    query: '',
    books: [],
    isSearching: false
  }

  search(query) {
    NProgress.start();
    BooksAPI.search(query).then(result => {
      this.setState({
        books: Array.isArray(result) ? result : [],
        isSearching: false
      });
      NProgress.done()
    })
  }

  debouncedSearch = debounce(this.search, 500);

  updateQuery(query) {
    const searchQuery = query.trim();
    this.setState({ query: searchQuery });

    if (searchQuery.length > 0) {
      this.setState({
        isSearching: true
      })
      this.debouncedSearch(searchQuery);
    } else {
      this.setState({
        books: []
      })
    }
  }

  render() {
    const { query } = this.state

    const books = this.state.books.map(book => {
      const shelfBook = this.props.shelfBooks.find(shelfBook => shelfBook.id === book.id);
      book.shelf = shelfBook ? shelfBook.shelf : 'none';
      return book;
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
             NOTES: The search from BooksAPI is limited to a particular set of search terms.
             You can find these search terms here:
             https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

             However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
             you don't find a specific author or title. Every search is limited by search terms.
             */}
            <input
                autoFocus
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          {this.state.books.length > 0 && this.state.query.length > 0 && (
              <BooksGrid books={books} onBookUpdate={this.props.onBookUpdate}/>
          )}

          {this.state.books.length === 0 && this.state.query.length > 0 && !this.state.isSearching && (
              <div>No books found</div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;