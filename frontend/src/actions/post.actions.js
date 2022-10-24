import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const getPosts = () => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/post/`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/post/like-post/` + postId,
      data: { id: userId },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/post/unlike-post/` + postId,
      data: { id: userId },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (postId, data) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/post/${postId}`,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { data, postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/post/${postId}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};
