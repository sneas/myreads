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
      this.setState({
        books
      });
    })
  }

  updateBook(bookToUpdate, shelf) {
    BooksAPI.update(bookToUpdate, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({
          books
        });
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Shelves books={this.state.books} onBookUpdate={(book, shelf) => this.updateBook(book, shelf)} />
        )}/>
        <Route path='/search' render={({ history }) => (
          <Search
              onBookUpdate={(book, shelf) => this.updateBook(book, shelf)}
              shelfBooks={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
