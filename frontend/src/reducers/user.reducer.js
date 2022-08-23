import {GET_USER} from '../actions/user.actions';
// Etat de base des reducers (vide)
const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    //dans le cas de GET_USER on incrémente l'initialState des données de payload et ces données seront accessibles par tous les components
    case GET_USER:
      return action.payload;

    default:
      return state;
  }
}
