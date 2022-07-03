import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import illustration from "../assets/img/ill-signup.png";
import "../styles/pages/_signup.scss";
import "../styles/components/_responsive.scss";

const FormSignup = () => {
  return (
    <div>
      <main className="login">
        <section className="form-container">
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
            <div className="input-form">
              <label htmlFor="password-confirm" className="icon-form">
                <FontAwesomeIcon icon={faLock} />
              </label>
              <input
                type="password"
                name="password-confirm"
                placeholder="Confirmer le mot de passe"
                required
              />
            </div>
            <div className="input-form">
              <label htmlFor="user" className="icon-form">
                <FontAwesomeIcon icon={faUser} />
              </label>
              <input
                type="text"
                name="user"
                placeholder="Nom d'utilisateur"
                required
              />
            </div>
            <div className="btn-primary">
              <button type="button" className="btn">
                S'inscrire
              </button>
              <div className="flex">
                <p>Déjà inscrit ?</p>
                <NavLink className="link" to="/">
                  Se connecter
                </NavLink>
              </div>
            </div>
          </form>
        </section>
        <section className="illust-container">
          <img src={illustration} alt="illustration d'une équipe de travail" />
        </section>
      </main>
    </div>
  );
};

export default FormSignup;
