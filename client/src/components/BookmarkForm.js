import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SnackBar from 'material-ui/SnackBar';
import { orange500 } from 'material-ui/styles/colors';

export default class BookmarkForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSnackBar: props.isSuccess
    };
  }

  handleRequestClose() {
    this.setState({
      openSnackBar: false
    });
  }

  handleChange(key, e) {
    this.props.onChange(key, e.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.bookmark.name = this.props.bookmark.name.trim();
    if(this.props.bookmark.name != '') {
      this.props.onSubmit(this.props.bookmark);

      this.setState({
        openSnackBar: true,
      });
    }
  }

  render() {
    const style = {
      general: {
        padding: 20,
        margin: 10
      },
      underlineStyle: {
        color: orange500
      },
      buttonStyle: {
        margin: 12
      }
    };
    return(
      <div>
        <Paper style={style.general} zDepth={1}>
          <form action="" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <TextField
                floatingLabelText="URL *"
                floatingLabelFixed={true}
                ref="url"
                name="url"
                fullWidth={true}
                underlineFocusStyle={style.underlineStyle}
                value={this.props.bookmark.url}
                onChange={this.handleChange.bind(this, 'url')}
              />
            </div>
            <div className="form-group">
              <TextField
                floatingLabelText="Name"
                floatingLabelFixed={true}
                ref="name"
                name="name"
                underlineFocusStyle={style.underlineStyle}
                value={this.props.bookmark.name}
                onChange={this.handleChange.bind(this, 'name')}
              />
            </div>
            <div className="form-group">
              <TextField
                floatingLabelText="Category"
                floatingLabelFixed={true}
                ref="category"
                name="category"
                underlineFocusStyle={style.underlineStyle}
                value={this.props.bookmark.category}
                onChange={this.handleChange.bind(this, 'category')}
              />
            </div>
            <div className="form-group">
              <TextField
                floatingLabelText="Description"
                floatingLabelFixed={true}
                multiLine={true}
                rows={2}
                ref="description"
                name="description"
                underlineFocusStyle={style.underlineStyle}
                value={this.props.bookmark.description}
                onChange={this.handleChange.bind(this, 'description')}
              />
            </div>
            <div className="form-group">
              <RaisedButton style={style.buttonStyle} label="Save Bookmark" type="submit"/>
              <RaisedButton style={style.buttonStyle} label="Reset" onClick={this.props.onReset}/>
            </div>
          </form>
        </Paper>

        <SnackBar
          open={this.state.openSnackBar}
          message={this.props.statusMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
      </div>
    )
  }
}
