import alt from '../alt';
import _ from 'lodash';
import BookmarkActions from '../actions/BookmarkActions';

class BookmarkStore {
  constructor() {
    this.bookmarks = [];
    this.selectedBookmark = {
      _id: null,
      name : '',
      url : '',
      category : '',
      description: ''
    };
    this.openDialog = false;
    this.statusMessage = '';
    this.successActionBookmark = false;

    this.bindActions(BookmarkActions);
  }

  onUpdateListBookmarks(bookmarks) {
    this.bookmarks = bookmarks;
    this.statusMessage =  '';
  }

  onFetchListBookmarks() {
    this.bookmarks = [];
  }

  onListBookmarksFailed(errorMessage) {
    this.statusMessage = errorMessage;
  }

  onAddBookmarkSuccess(newBookmark) {
    let newCategory = true
    let bookmarks = this.bookmarks;
    for(let category of bookmarks) {
      if(category.name == newBookmark.category) {
        category.bookmarks.push(newBookmark);
        newCategory = false;
        break;
      }
    }

    if(newCategory) {
      bookmarks.push({
        _id: newBookmark._id + '_cat',
        name: newBookmark.category,
        bookmarks: [newBookmark]
      });
    }

    this.onResetBookmark();
    this.statusMessage = 'Bookmark successfuly added !';
    this.successActionBookmark = true;
  }

  onEditBookmarkSuccess(bookmark) {
    this.onResetBookmark();
    this.statusMessage = 'Bookmark successfuly updated !';
    this.successActionBookmark = true;
  }

  onDeleteBookmarkSuccess(bookmarkDeleted) {
    let bookmarks = this.bookmarks;
    let deleteCatgory = false;
    for(let category of bookmarks) {
      if(category.name == bookmarkDeleted.category) {
        category.bookmarks = _.remove(category.bookmarks, (item) => {
          return item._id != bookmarkDeleted._id;
        });
        break;
      }
    }

    bookmarks = _.remove(bookmarks, (item) => {
      return item.bookmarks.length == 0;
    });

    this.statusMessage = 'Bookmark successfuly deleted !';
    this.successActionBookmark = true;
  }

  onBookmarkActionFail() {
    this.statusMessage = 'An error occurred during the process...';
  }

  onResetBookmark() {
    this.selectedBookmark = {
      _id: null,
      name : '',
      url : '',
      category : '',
      description: ''
    };
  }

}

module.exports = alt.createStore(BookmarkStore, 'BookmarkStore');
