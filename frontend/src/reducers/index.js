// Bibliothèque qui regroupe tous les reducers et les envoie vers le store
import { combineReducers } from "redux";
//import du state
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";

export default combineReducers({
  userReducer,
  usersReducer,
});
