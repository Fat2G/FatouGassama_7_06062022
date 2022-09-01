import { GET_USER, UPLOAD_PICTURE } from "../actions/user.actions";
// Etat de base des reducers (vide)
const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    //dans le cas de GET_USER on incrémente l'initialState des données de payload et ces données seront accessibles par tous les components
    case GET_USER:
      return action.payload;

    case UPLOAD_PICTURE:
      return {
        // on récupère les données de l'utilisateur en utilisant l'opérateur spread sans l'écraser
        ...state,
        // et on change l'image de profil
        picture: action.payload,
      };

    default:
      return state;
  }
}
