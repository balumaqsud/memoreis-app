import mongoose from "mongoose";

//createing the schema for the posts
const postSchema = new mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// turn the schema to model

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
