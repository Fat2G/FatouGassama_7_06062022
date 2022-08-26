import axios from "axios";

// Pour récupérer les données de l'utilisateur connecté
export const GET_USER = "GET_USER";
export const UPLOAD_IMG = "UPLOAD_IMG";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = (userId) => {
  return (dispatch) => {
    return (
      axios
        //récupération des données de l'utilisateur
        .get(`${process.env.REACT_APP_API_URL}/api/auth/${userId}`)
        //utilisation de la méthode dispatch pour envoyer des données vers le reducer
        .then((res) => {
          dispatch({ type: GET_USER, payload: res.data });
        })
        .catch((err) => console.log(err))
    );
  };
};

export const uploadImg = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/${id}/upload`, data)
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}/api/auth/${id}`)
          .then((res) => {
            dispatch({ type: UPLOAD_IMG, payload: res.data.picture });
          });
      })
      .catch((err) => console.log(err));
  };
};
