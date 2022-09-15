import {
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
} from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    // rassemblement de tous les posts
    case GET_POSTS:
      return action.payload;
    // ajout du like dans le store
    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: [action.payload.userId, ...post.likers],
          };
        }
        return post;
      });
    // retrait du like
    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.userId),
          };
        }
        return post;
      });
    // update du post
    case UPDATE_POST:
      return state.map((post)=>{
        if (post._id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.message
          }
        }
        return post;
      })

    default:
      return state;
  }
}
