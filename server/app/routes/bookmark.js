import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';

import Bookmark from '../models/bookmarkModel';
import BookmarkController from '../controllers/bookmarkController';

const router = express.Router();

router.route('/')
  // GET /api/bookmarks - Get list of bookmarks
  .get(BookmarkController.findAll)
  // POST /api/bookmarks - Create new bookmark
  .post(validate(paramValidation.createBookmark), BookmarkController.create);

router.route('/:bookmark_id')
  // GET /api/bookmarks/:bookmark_id - Get bookmark
  .get(validate(paramValidation.findBookmark), BookmarkController.find)
  // PUT /api/bookmarks/:bookmark_id - Update bookmark
  .put(validate(paramValidation.updateBookmark), BookmarkController.update)
  // DELETE /api/bookmarks/:bookmark_id - Delete bookmark
  .delete(validate(paramValidation.deleteBookmark), BookmarkController.remove);

export default router;
