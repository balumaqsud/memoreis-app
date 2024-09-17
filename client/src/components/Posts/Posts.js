import React from "react";
import Post from "./Post/Post.js";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";

const Posts = ({ setCurrentId, setrebuild }) => {
  const posts = useSelector((state) => state.posts);

  console.log(posts);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid className="container" container alignItems={"stretch"} spacing={3}>
      {posts.map((post) => (
        <Grid item key={post.id} xs={12} sm={6}>
          <Post
            post={post}
            setCurrentId={setCurrentId}
            setrebuild={setrebuild}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
