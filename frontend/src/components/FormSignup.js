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
      <main class="login">
        <section class="form-container">
          <form action="/" method="post">
            <div class="icon-user">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div class="input-form">
              <label for="email" class="icon-form">
                <FontAwesomeIcon icon={faEnvelope} />
              </label>
              <input
                type="text"
                name="email"
                placeholder="Adresse email"
                required
              />
            </div>
            <div class="input-form">
              <label for="password" class="icon-form">
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
            <div class="input-form">
              <label for="password-confirm" class="icon-form">
                <FontAwesomeIcon icon={faLock} />
              </label>
              <input
                type="password"
                name="password-confirm"
                placeholder="Confirmer le mot de passe"
                required
              />
            </div>
            <div class="input-form">
              <label for="user" class="icon-form">
                <FontAwesomeIcon icon={faUser} />
              </label>
              <input
                type="text"
                name="user"
                placeholder="Nom d'utilisateur"
                required
              />
            </div>
            <div class="btn-primary">
              <button type="button" class="btn">
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
        <section class="illust-container">
          <img src={illustration} alt="illustration d'une équipe de travail" />
        </section>
      </main>
    </div>
  );
};

export default FormSignup;
