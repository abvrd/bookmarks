import Joi from 'joi';

export default {
  // GET /api/bookmarks/:bookmark_id
  findBookmark: {
    params: {
      bookmark_id: Joi.required()
    }
  },

  // POST /api/bookmarks
  createBookmark: {
    body: {
      name: Joi.string().required(),
      url: Joi.string().uri().required(),
      category: Joi.string().required(),
      description: Joi.string().allow(''),
    }
  },

  // UPDATE /api/bookmarks/:bookmark_id
  updateBookmark: {
    body: {
      name: Joi.string().required(),
      url: Joi.string().uri().required(),
      category: Joi.string().required(),
      description: Joi.string().allow(''),
    },
    params: {
      bookmark_id: Joi.string().hex().required()
    }
  },

  // DELETE /api/bookmarks/:bookmark_id
  deleteBookmark: {
    params: {
      bookmark_id: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }
  }
};
