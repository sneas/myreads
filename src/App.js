import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Shelves from './Shelves'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({
        books
      });
    })
  }

  updateBook(bookToUpdate, shelf) {
    BooksAPI.update(bookToUpdate, shelf).then((res) => {
      if (shelf === 'none') {
        this.setState({books: this.state.books.filter(book => book.id !== bookToUpdate.id)});
      } else {
        this.setState({books: this.state.books.map(book => {
          if (book.id === bookToUpdate.id) {
            book.shelf = shelf;
          }
          return book;
        })})
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Shelves books={this.state.books} onBookUpdate={(book, shelf) => this.updateBook(book, shelf)} />
        )}/>
        <Route path='/search' render={({ history }) => (
          <Search />
        )}/>
      </div>
    )
  }
}

export default BooksApp
