import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';

/**
 * Bookmark Schema
 * @type {mongoose.Schema}
 */
const BookmarkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  description: String,
  url: {
    type: String,
    required: true
  },
  favicon: String,
  category: {
    type: String,
    required: true
  }
});

BookmarkSchema.statics = {
  /**
   * [description]
   * @param  {ObjectId} id - The id of the bookmark
   * @return {Promise<Bookmark, APIError>}
   */
  findBookmark(id) {
    return this.findById(id)
      .execAsync().then((bookmark) => {
        if(bookmark) {
          return bookmark;
        }
        const err = new APIError('Not found', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * Get list of Bookmarks group by categories
   * @return {Promise<Bookmark[]>}
   */
  listByCategory(category) {
    return this.find()
      .sort({category:category})
      .execAsync();
  }
};

/**
 * @typedef Bookmark
 */
export default mongoose.model('Bookmark', BookmarkSchema);
