import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Shelves from './Shelves'
import Search from './Search'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    NProgress.start();
    this.fetchAll().then(() => {
      NProgress.done();
    })
  }

  updateBook(bookToUpdate, shelf) {
    NProgress.start()
    return BooksAPI.update(bookToUpdate, shelf).then(() => {
      this.fetchAll().then(() => {
        NProgress.done();
      })
    })
  }

  fetchAll() {
    return BooksAPI.getAll().then((books) => {
      this.setState({
        books
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
