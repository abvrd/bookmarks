import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {grey400, darkBlack, orange500, red500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteForeverIcon from 'material-ui/svg-icons/action/delete-forever';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';


export default class BookmarkList extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(bookmark, event, value) {
    if(value == 'edit') {
      this.props.onEdit(bookmark);
    } else if(value == 'delete') {
      this.props.onDelete(bookmark);
    }
  }

  handleClick(url, event) {
    window.open(url, '_blank');
  }

  render() {
    const iconButtonElement = (
      <IconButton
        touch={true}
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    return (
      <List>
        <Subheader>{this.props.name}</Subheader>
        {this.props.bookmarks.map((data) => {
          const rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}
              onChange={this.handleChange.bind(this, data)}
            >
              <MenuItem leftIcon={<ModeEditIcon color={orange500} />} value="edit">Edit</MenuItem>
              <MenuItem leftIcon={<DeleteForeverIcon color={red500} />} value="delete">Delete</MenuItem>
            </IconMenu>
          );

          return (
            <ListItem
              key={data._id}
              primaryText={data.name}
              secondaryText={data.description}
              leftAvatar={<Avatar src={data.favicon} size={20}/>}
              rightIconButton={rightIconMenu}
              onTouchTap={this.handleClick.bind(this, data.url)}
            />
          );
        })}
      </List>
    );
  }
}
