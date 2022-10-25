import { useState, React } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import illustration from "../../assets/img/ill-signup.png";
import ModalSuccess from "../utils/ModalSuccess";

const FormSignup = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // messages d'erreur
    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm-error"
    );
    const usernameError = document.querySelector(".username-error");

    passwordConfirmError.innerHTML = "";

    if (password !== controlPassword) {
      passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
    } else {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        data: {
          email,
          password,
          username,
        },
      })
        .then(() => {
          setFormSubmit(true);
        })
        .catch(({ response: err }) => {
          if (err.data.errors) {
            emailError.innerHTML = err.data.errors.email;
            passwordError.innerHTML = err.data.errors.password;
            usernameError.innerHTML = err.data.errors.username;
          } else if (err.data.message) {
            emailError.innerHTML = err.data.message;
          }
        });
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <ModalSuccess />
        </>
      ) : (
        <div>
          <main>
            <section className="form-ctn">
              <form action="" method="post" onSubmit={handleSignup}>
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
                    id="email"
                    placeholder="Adresse email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>
                <div className="email-error error"></div>
                <br />
                <div className="input-form">
                  <label htmlFor="password" className="icon-form">
                    <FontAwesomeIcon icon={faLock} />
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Mot de passe"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                <div className="password-error error"></div>
                <br />
                <div className="input-form">
                  <label htmlFor="password-confirm" className="icon-form">
                    <FontAwesomeIcon icon={faLock} />
                  </label>
                  <input
                    type="password"
                    name="password-confirm"
                    id="password-confirm"
                    placeholder="Confirmer le mot de passe"
                    onChange={(e) => setControlPassword(e.target.value)}
                    value={controlPassword}
                    required
                  />
                </div>
                <div className="password-confirm-error error"></div>
                <br />
                <div className="input-form">
                  <label htmlFor="username" className="icon-form">
                    <FontAwesomeIcon icon={faUser} />
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Nom d'utilisateur"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                  />
                </div>
                <div className="username-error error"></div>
                <br />
                <div className="btn-ctn">
                  <input type="submit" value="S'inscrire" className="btn" />
                  <div className="flex">
                    <p>Déjà inscrit ?</p>
                    <NavLink className="link" to="/">
                      Se connecter
                    </NavLink>
                  </div>
                </div>
              </form>
            </section>
            <section className="ctn-illust">
              <img
                src={illustration}
                alt="illustration d'une équipe de travail"
              />
            </section>
          </main>
        </div>
      )}
    </>
  );
};

export default FormSignup;
