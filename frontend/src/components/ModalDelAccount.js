import { React, useState } from "react";
import axios from "axios";
import "../styles/pages/_login.scss";
import "../styles/components/_modal.scss";

const ModalDelAccount = () => {
  //utilisation de la fonction modal afin de créer une fenêtre pop-up en utilisant le hook useState.
  const [modalDelAccount, setModalDelAccount] = useState(true);

  // puisque setModal est false il devient true et inversement
  const toggleModalDelAccount = () => {
    setModalDelAccount(!modalDelAccount);
  };

  //suppression du compte utilisateur
  const delUser = () => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}api/auth/user/delete`,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
    })
  };

  return (
    <div>
      {/* Implémentation du "short circuit condition" afin de montrer ou cacher les éléments lorsque la condition (modal) est remplie.
      Peut etre considéré comme une version minifié d'un opérateur ternaire. */}
      {modalDelAccount && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h1>Voulez-vous supprimer le compte ?</h1>
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
