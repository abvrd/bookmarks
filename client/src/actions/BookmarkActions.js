import alt from '../alt';
import _ from 'lodash';
import 'whatwg-fetch';

var BookmarkSource = require('../sources/BookmarkSource');

class BookmarkActions {
  constructor() {
    this.generateActions(
      'addBookmarkSuccess',
      'deleteBookmarkSuccess',
      'editBookmarkSuccess',
      'bookmarkActionFail',
      'resetBookmark'
    );
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  addBookmark(bookmark) {
    return(dispatch) => {
      dispatch();

      let method = 'POST';
      let url = 'http://localhost:3000/api/bookmarks';
      if(typeof bookmark._id !== "undefined" && bookmark._id) {
        method = 'PUT';
        url = `http://localhost:3000/api/bookmarks/${bookmark._id}`;
      }

      fetch(url, {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: bookmark.name,
          url: bookmark.url,
          category: bookmark.category,
          description: bookmark.description
        })
      })
        // .then(this.checkStatus)
        .then((response) => response.json())
        .then((bookmark) => {
          if(method == 'POST') {
            this.addBookmarkSuccess(bookmark);
          } else if(method == 'PUT') {
            this.editBookmarkSuccess(bookmark);
          }
        })
        .catch((error) => {
          this.bookmarkActionFail();
        });
    }
  }

  deleteBookmark(bookmark) {
    return(dispatch) => {
      dispatch();

      fetch(`http://localhost:3000/api/bookmarks/${bookmark._id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(this.checkStatus)
        .then((response) => response.json())
        .then((res) => {
          this.deleteBookmarkSuccess(bookmark);
        })
        .catch((error) => {
          this.bookmarkActionFail();
        });
    }
  }

  updateListBookmarks(bookmarks) {
    return bookmarks;
  }

  fetchListBookmarks() {
    return (dispatch) => {
      dispatch();

      fetch('http://localhost:3000/api/bookmarks')
        .then((response) => response.json())
        .then((data) => {
          let sortedDataByCategories = _.chain(data)
            .groupBy('category')
            .map((value, key) => {
              return {
                _id: value[0]._id + '_cat',
                name: key,
                bookmarks: value
              }
            })
            .value();
          this.updateListBookmarks(sortedDataByCategories);
        })
        .catch((errorMessage) => {
          this.bookmarksListFailed(errorMessage);
        });
    }
  }

  bookmarksListFailed(errorMessage) {
    return errorMessage;
  }
}

module.exports = alt.createActions(BookmarkActions);
