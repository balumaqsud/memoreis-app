import React, { useState, useEffect } from "react";
import { TextField, Typography, Button, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import { createPost, updatePost } from "../../actions/post.js";
import "./styles.scss";

const Form = ({ currentId, setCurrentId }) => {
  /////
  const dispatch = useDispatch();

  //////
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  //////
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  /// for blanks
  const [errors, setErrors] = useState({});

  //////
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  /////checking if blanks are filled while submitting
  const validate = () => {
    let tempErrors = {};
    if (!postData.creator) tempErrors.creator = "Creator is required";
    if (!postData.title) tempErrors.title = "Title is required.";
    if (!postData.message) tempErrors.message = "Message is required.";
    if (!postData.tags || postData.tags.length === 0)
      tempErrors.tags = "At least one tag is required.";
    if (!postData.selectedFile)
      tempErrors.selectedFile = "A file must be selected.";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  ////// handling submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      if (currentId) {
        dispatch(updatePost(currentId, postData));
      } else {
        dispatch(createPost(postData));
      }
      clear();
    }
  };

  //////

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className="paper" style={{ borderRadius: "20px" }}>
      <form
        autoComplete="off"
        noValidate
        className="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
          helperText={errors.creator}
        />
        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          helperText={errors.title}
        />
        <TextField
          name="message"
          variant="outlined"
          label="message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          helperText={errors.message}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
          helperText={errors.tags}
        />
        <div className="fileInput">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          ></FileBase>
        </div>
        <Button
          className="buttonSubmit"
          variant="contained"
          size="medium"
          color="primary"
          fullWidth
          type="submit"
          style={{ margin: "6px 0" }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
