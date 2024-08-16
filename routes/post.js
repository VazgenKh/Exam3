const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getSinglePost);
router.put('/:id', postController.updatePost);
router.get('/search', postController.searchPost);

module.exports = router;
