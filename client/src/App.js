import React from "react";
//using hooks to dispatch an action
import { useDispatch } from "react-redux";

import { useState, useEffect } from "react";

import { getPosts } from "./actions/post.js";
// eslint-disable-next-line
import { Container, Grid, Grow, Typography } from "@mui/material";
import memories from "./images/memories.png";
import Posts from "./components/Posts/Posts.js";
import Form from "./components/Forms/Form.js";

//styles
import "./styles.scss";

const App = () => {
  //defining the dispatch
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [rebuiild, setrebuild] = useState(new Date());
  // using useEffect

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId, rebuiild]);

  return (
    <Container maxWidth="lg">
      <div className="AppBar">
        <Typography className="heading" variant="h2">
          Memoires
        </Typography>
        <img className="image" src={memories} alt="memories" height="60" />
      </div>
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
    </Container>
  );
};

export default App;
