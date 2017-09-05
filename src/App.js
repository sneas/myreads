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

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Shelves books={this.state.books} />
        )}/>
        <Route path='/search' render={({ history }) => (
          <Search />
        )}/>
      </div>
    )
  }
}

export default BooksApp
