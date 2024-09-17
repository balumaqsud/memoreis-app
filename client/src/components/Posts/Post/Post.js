import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/post";

import {
  Card,
  CardActions,
  Button,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import "./styles.scss";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Post = ({ post, setCurrentId, setrebuild }) => {
  const dispatch = useDispatch();

  return (
    <Card className="card">
      <CardMedia
        className="media"
        image={post.selectedFile}
        title={post.title}
      />
      <div className="overlay">
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow(true)}
        </Typography>
      </div>
      <div className="overlay2">
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreVertIcon fontSize="small" />
        </Button>
      </div>
      <div className="details">
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className="title" variant="h5">
        {post.title}
      </Typography>
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className="cardActions">
        <Button
          color="primary"
          size="small"
          onClick={() => {
            dispatch(likePost(post._id));
            setrebuild(new Date());
          }}
        >
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; like&nbsp;{post.likeCount}
        </Button>
        <Button
          color="primary"
          size="small"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteIcon fontSize="small" />
          &nbsp; delete &nbsp;
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
