import axios from "axios";

// Pour récupérer les données de l'utilisateur connecté
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = (userId) => {
  return (dispatch) => {
    return (
      axios
        //récupération des données de l'utilisateur
        .get(`${process.env.REACT_APP_API_URL}/api/auth/${userId}`, {
          withCredentials: true,
        })
        //utilisation de la méthode dispatch pour envoyer des données vers le reducer
        .then((res) => {
          dispatch({ type: GET_USER, payload: res.data });
        })
        .catch((err) => console.log(err))
    );
  };
};

export const uploadPic = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/upload`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
            .get(`${process.env.REACT_APP_API_URL}/api/auth/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.errors) {
          dispatch({
            type: GET_USER_ERRORS,
            payload: err.response.data.errors,
          });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
        }
      });
  };
};