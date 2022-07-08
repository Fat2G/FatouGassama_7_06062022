import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import illustration from "../assets/img/ill-login.png";
import "../styles/pages/_login.scss";
import "../styles/components/_responsive.scss";

const FormLogin = () => {
  //utilisation de la fonction modal afin de créer une fenêtre pop-up en utilisant le hook useState.
  const [modalPwd, setModalPwd] = useState(false);

  // puisque setModal est false il devient true et inversement
  const toggleModalPwd = () => {
    setModalPwd(!modalPwd);
  };

  return (
    <div>
      <main>
        <section className="ctn-illust">
          <img src={illustration} alt="illustration d'une équipe de travail" />
        </section>
        <section className="form-ctn">
          <form action="/" method="post">
            <div className="icon-user">
              <FontAwesomeIcon icon={faUser} />
            </div>
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
            <div>
              <div className="input-form">
                <label htmlFor="password" className="icon-form">
                  <FontAwesomeIcon icon={faLock} />
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  required
                />
                <FontAwesomeIcon icon={faEye} />
              </div>
              <div className="flex">
                <p>Mot de passe oublié ?</p>
                <button type="button" className="link" onClick={toggleModalPwd}>
                  Cliquez ici
                </button>
              </div>
            </div>
            <div className="btn-ctn">
              <NavLink className="" to="/dashboard">
                <button type="button" className="btn">
                  Connexion
                </button>
              </NavLink>
              <div className="flex">
                <p>Pas encore inscrit ?</p>
                <NavLink className="link" to="/inscription">
                  S'inscrire
                </NavLink>
              </div>
            </div>
          </form>
        </section>
      </main>

      {/* Implémentation du "short circuit condition" afin de montrer ou cacher les éléments lorsque la condition (modal) est remplie.
      Peut etre considéré comme une version minifié d'un opérateur ternaire. */}
      {modalPwd && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <div className="modal-icons">
              {/* fermeture du modal */}
              <FontAwesomeIcon
                className="close-modal"
                onClick={toggleModalPwd}
                icon={faCircleXmark}
              />
            </div>
            <h1>Vous avez oublié votre mot de passe?</h1>
            <p>
              Veuillez entrer votre email afin de récupérer votre mot de
              passe.
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

export default FormLogin;
