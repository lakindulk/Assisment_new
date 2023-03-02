const Like = require('../models/like-model');
const Post = require('../models/post-model');
const User = require('../models/user-model');

exports.likePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find();
    const likes = await Promise.all(
      posts.map(async (post) => {
        const userLiked = await Like.exists({
          post: post._id,
          user: userId,
          like: true,
        });
        return {
          postId: post._id,
          likes: await Like.countDocuments({ post: post._id, like: true }),
          userLiked,
        };
      })
    );
    return res.send({ likes });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.updateLike = async (req, res) => {
  try {
    const like = await Like.findOne({
      post: req.params.postId,
      user: req.user._id,
    });
    if (!like) {
      const newLike = await Like.create({
        post: req.params.postId,
        user: req.user._id,
        like: true,
      });
      return res.send({ newLike });
    } else {
      like.like = !like.like;
      await like.save();
      return res.send({ like });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
