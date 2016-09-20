import express from 'express';

import bookmarkRoutes from './bookmark';

const router = express.Router();

// test route
router.get('/test', (req, res) => {
  res.json({ message: 'Welcome on the api'});
});

router.use('/bookmarks', bookmarkRoutes);


export default router;
