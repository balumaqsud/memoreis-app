import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const fetchPosts = () => API.get("/posts");

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`'/posts'/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`'/posts'/${id}`);

export const likePost = (id) => API.patch(`'/posts'/${id}/likePost`);

export const signIn = (formatData) => API.post("/user/signin", formatData);
export const signUp = (formatData) => API.post("/user/signup", formatData);
