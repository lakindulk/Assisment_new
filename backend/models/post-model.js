const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
   posttImage: {
        imagePublicId: {
          type: String,
        
        },
        imageSecURL: {
          type: String,
          
        },
      },
    title:{
        type: String,
    },
    description:{
        type: String,
    },
    date:{
        type: String,
    },
    like:{
        type: String,
    },
    email:{
      type: String,
  },
  username:{
    type: String,
},
})

const post = mongoose.model("post", postSchema);

module.exports = post;

