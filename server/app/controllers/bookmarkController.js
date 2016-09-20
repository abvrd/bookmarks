import Bookmark from '../models/bookmarkModel';

/**
 * Get list of bookmarks
 * @return {Bookmark[]}
 */
function findAll(req, res, next) {
  Bookmark.find(function(err, bookmarks) {
    if(err) {
      next(err);
    } else {
      res.json(bookmarks);
    }
  });
}

/**
 * Get bookmark
 * @param  {string} req.params.bookmark_id - Bookmark identifier
 * @return {Bookmark}
 */
function find(req, res, next) {
  Bookmark.findBookmark(req.params.bookmark_id).then((bookmark) => {
    res.json(bookmark);
  }).error((err) => next(err));
}

/**
 * Create new bookmark
 * @property {string} req.body.name - The name of the bookmark
 * @property {string} req.body.url - Url of the bookmark
 * @property {string} req.body.category - Category of the bookmark
 * @property {string} req.body.description - Description of the bookmark
 * @return {Bookmark}
 */
function create(req, res, next) {
  let bookmark = new Bookmark();
  bookmark.name = req.body.name;
  bookmark.url = req.body.url;
  bookmark.category = req.body.category;
  bookmark.description = req.body.description;
  bookmark.favicon = req.body.favicon;
  bookmark.save(err => {
    if(err) {
      next(err);
    }
    res.json(bookmark);
  });
}

/**
 * Update existing bookmark
 * @param  {string} req.params.bookmark_id - Bookmark identifier
 * @property {string} req.body.name - The name of the bookmark
 * @property {string} req.body.url - Url of the bookmark
 * @property {string} req.body.category - Category of the bookmark
 * @property {string} req.body.description - Description of the bookmark
 * @return {Bookmark}
 */
function update(req, res, next) {
  Bookmark.findBookmark(req.params.bookmark_id).then((bookmark) => {
    bookmark.name = req.body.name;
    bookmark.url = req.body.url;
    bookmark.category = req.body.category;
    bookmark.description = req.body.description;

    bookmark.saveAsync()
    .then((savedBookmark) => res.json(savedBookmark))
    .error((err) => next(err));

  }).error((err) => next(err));
}

/**
 * Delete bookmark
 * @param  {string} req.params.bookmark_id - Bookmark identifier
 * @return {string}
 */
function remove(req, res, next) {
  Bookmark.remove({
    _id: req.params.bookmark_id
  }, (err, bookmark) => {
    if(err) {
      next(err);
    } else {
      res.json({
        'message' : 'Bookmark Successfully Removed'
      });
    }
  });
}

export default {findAll, find, create, update, remove};
