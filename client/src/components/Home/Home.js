import React from "react";
import Posts from "../Posts/Posts.js";
import Form from "../Forms/Form.js";
import { Container, Grid, Grow } from "@mui/material";

//using hooks to dispatch an action
import { useDispatch } from "react-redux";

import { useState, useEffect } from "react";

import { getPosts } from "../../actions/post.js";

const Home = () => {
  //defining the dispatch
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [rebuiild, setrebuild] = useState(new Date());
  // using useEffect

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId, rebuiild]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justigy="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Posts
              currentId={currentId}
              setCurrentId={setCurrentId}
              setrebuild={setrebuild}
            />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
