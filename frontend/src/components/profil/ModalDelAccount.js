import { React, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import cookie from "js-cookie";

const ModalDelAccount = () => {
  //utilisation de la fonction modal afin de créer une fenêtre pop-up en utilisant le hook useState.
  const [modalDelAccount, setModalDelAccount] = useState(true);

  // puisque setModal est false il devient true et inversement
  const toggleModalDelAccount = () => {
    setModalDelAccount(!modalDelAccount);
  };

  const userData = useSelector((state) => state.userReducer);

  // retrait du cookie
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  //suppression du compte utilisateur
  const delUser = () => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/auth/${userData._id}`,
      withCredentials: true,
    })
      .then((res) => {
        removeCookie("jwt");
      })
      .catch((err) => {
        console.log(err);
      });

    window.location = "/";
  };

  return (
    <div>
      {/* Implémentation du "short circuit condition" afin de montrer ou cacher les éléments lorsque la condition (modal) est remplie.
      Peut etre considéré comme une version minifié d'un opérateur ternaire. */}
      {modalDelAccount && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content modal-del">
            <h1 id="modal-title">Voulez-vous supprimer le compte ?</h1>
            <div className="btn-ctn btn-flex">
              <button type="button" className="btn" onClick={delUser}>
                Supprimer
              </button>
              <button
                type="button"
                className="btn btn-cancel"
                onClick={toggleModalDelAccount}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalDelAccount;
