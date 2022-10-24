import axios from "axios";
// action pour avoir tous les utilisateurs dans le store
export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/auth`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
