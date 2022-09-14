import { GET_USERS } from "../actions/users.actions";
// Etat de base des reducers (vide)
const initialState = {};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    //dans le cas de GET_USERS on incrémente l'initialState des données de payload et ces données seront accessibles par tous les components
    case GET_USERS:
      return action.payload;

    default:
      return state;
  }
}
