import React, { Component } from 'react';

import BookmarkForm from './BookmarkForm';
import BookmarkList from './BookmarkList';

import BookmarkStore from '../stores/BookmarkStore';
import BookmarkActions from '../actions/BookmarkActions';

import {deepOrange500, cyan700} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepOrange500,
    accent1Color: cyan700
  }
});

const style = {
  wrapper: {
    maxWidth: 800,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
}

class App extends Component {

  constructor(props) {
    super(props);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.state = BookmarkStore.getState();
  }

  componentDidMount() {
    BookmarkStore.listen(this.onStoreChange);
    BookmarkActions.fetchListBookmarks();
  }

  componentWillUnmount() {
    BookmarkStore.unlisten(this.onStoreChange);
  }

  onStoreChange(state) {
    this.setState(state);
  }

  handleDialogClose() {
    this.setState({
      openDialog: false
    });
  }

  handleDialogOpen(bookmark) {
    this.setState({
      openDialog: !this.state.openDialog,
      selectedBookmark: bookmark
    });
  }

  handleFormChange(key, value) {
    let bookmark = this.state.selectedBookmark;
    bookmark[key] = value;
    this.setState({
      selectedBookmark: bookmark
    });
  }

  handleBookmarkSubmit(bookmark) {
    BookmarkActions.addBookmark(bookmark);
  }

  handleBookmarkEdit(bookmark) {
    this.setState({
      selectedBookmark: bookmark
    });
  }

  handleBookmarkDelete() {
    this.setState({
      openDialog: false
    });

    BookmarkActions.deleteBookmark(this.state.selectedBookmark);
  }

  render() {
    const dialogActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleDialogClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleBookmarkDelete.bind(this)}
      />,
    ];

    if(this.state.bookmarks.length == 0) {
      return (
        <div>
          <img src="/assets/images/loader.gif" />
        </div>
      );
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar title="My Bookmarks"/>
          <div style={style.wrapper}>
            <BookmarkForm
              bookmark={this.state.selectedBookmark}
              onSubmit={this.handleBookmarkSubmit.bind(this)}
              onReset={BookmarkActions.resetBookmark}
              onChange={this.handleFormChange.bind(this)}
              statusMessage={this.state.statusMessage}
              isSuccess={this.state.successActionBookmark}
            />
            <div className="bookmarkList">
              {this.state.bookmarks.map((data) => {
                return (
                  <div key={data._id}>
                    <BookmarkList
                      name={data.name}
                      bookmarks={data.bookmarks}
                      onEdit={this.handleBookmarkEdit.bind(this)}
                      onDelete={this.handleDialogOpen.bind(this)}
                    />
                    <Divider />
                  </div>
                );
              })}
            </div>
          </div>
          <Dialog
            title="Caution"
            actions={dialogActions}
            modal={true}
            open={this.state.openDialog}
            onRequestClose={this.handleBookmarkDelete.bind(this)}
          >
            You&#39;re about to delete this item. Are you sure ?
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
