import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.actions";
import { getPosts } from "./actions/post.actions";

// outil de développement
import { composeWithDevTools } from "redux-devtools-extension";

// création du store
const store = legacy_createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUsers());
store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
