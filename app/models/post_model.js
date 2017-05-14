import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const PostSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'UserModel' },
  tags: String,
  content: String,
  cover_url: String,
}, {
  toJSON: {
    virtuals: false,
  },
});

// create PostModel class from schema
const PostModel = mongoose.model('Post', PostSchema);


export default PostModel;
