import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookMenu extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onBookUpdate: PropTypes.func.isRequired
  }

  updateShelf(shelf) {
    this.props.onBookUpdate(this.props.book, shelf);
  }

  render() {
    return (
        <select value={this.props.book.shelf} onChange={event => this.updateShelf(event.target.value)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
    );
  }
}

export default BookMenu;