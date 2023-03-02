const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  like: {
    type: Boolean,
    default: false,
  },
});

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
