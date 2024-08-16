const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.createPostComment);
router.get('/:postId', commentController.getPostComments);

module.exports = router;
