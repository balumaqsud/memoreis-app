import React from "react";

// provider keeps track of the store, that can be accessed from anywhere // global state
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

import { createRoot } from "react-dom/client";

//importing reducers
import reducers from "./reducers";

import App from "./App";
import "./index.scss";

//setting redux, create store takes 2 arguments

const store = createStore(reducers, compose(applyMiddleware(thunk)));

//now store is created, we can wrap app with provider, now app is using redux

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
