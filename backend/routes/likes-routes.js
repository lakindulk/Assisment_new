const express = require('express');
const router = express.Router();

//import protected-routes middlewares
const { protectedUser } = require('../middlewares/route-authorization');

// Import the controller
const { likePost, updateLike } = require('../controllers/likes-controller');

// Route to retrieve the number of likes for a specific post
router.route('/').get(protectedUser, likePost);

// Route to update the like count for a specific post
router.route('/:postId').patch(protectedUser, updateLike);

module.exports = router;
