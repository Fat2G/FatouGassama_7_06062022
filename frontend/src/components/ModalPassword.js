import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/components/_modal.scss"

const ModalPassword = () => {
  //utilisation de la fonction modal afin de créer une fenêtre pop-up en utilisant le hook useState.
  const [modalPwdClose, setModalPwdClose] = useState(true);

  // puisque setModal est false il devient true et inversement
  const toggleModalPwdClose = () => {
    setModalPwdClose(!modalPwdClose);
  };

  return (
    <div>
      {/* Implémentation du "short circuit condition" afin de montrer ou cacher les éléments lorsque la condition (modal) est remplie.
      Peut etre considéré comme une version minifié d'un opérateur ternaire. */}
      {modalPwdClose && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <div className="modal-icons">
              {/* fermeture du modal */}
              <FontAwesomeIcon
                className="close-modal"
                onClick={toggleModalPwdClose}
                icon={faCircleXmark}
              />
            </div>
            <h1>Vous avez oublié votre mot de passe?</h1>
            <p>
              Veuillez entrer votre email afin de récupérer votre mot de passe.
            </p>
            <div className="input-form">
              <label htmlFor="email" className="icon-form">
                <FontAwesomeIcon icon={faEnvelope} />
              </label>
              <input
                type="text"
                name="email"
                placeholder="Adresse email"
                required
              />
            </div>
            <div className="btn-ctn">
              <button type="button" className="btn">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalPassword;
