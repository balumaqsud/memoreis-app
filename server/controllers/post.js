//importing the model to create posts
import mongoose from "mongoose";
import PostMessage from "../models/postModels.js";

export const getPosts = async (req, res) => {
  try {
    //finding posts from the databes and returning it
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    //returnning error
    res.status(404).json({ message: error.message });
  }
};

//creating posts using model
export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;
  const newPost = new PostMessage({
    title,
    message,
    selectedFile,
    creator,
    tags,
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("no post with this id");
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with this id");

  await PostMessage.findByIdAndDelete(id);
  res.json("post was deleted succesfullys");
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { $inc: { likeCount: 1 } },
    { new: true }
  );

  res.json(updatedPost);
};
