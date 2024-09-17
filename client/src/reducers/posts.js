// a reducer is a fuction tahta accepts state and action,
//then based on the action type it does return different logic/action

import {
  LIKE,
  UPDATE,
  FETCH_ALL,
  DELETE,
  CREATE_POST,
} from "../constants/constants";

const postReducer = (posts = [], action) => {
  switch (action.type) {
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload.id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);

    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case FETCH_ALL:
      return action.payload;

    case CREATE_POST:
      return [...posts, action.payload];

    default:
      return posts;
  }
};

export default postReducer;
