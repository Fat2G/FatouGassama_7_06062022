import { React, useState } from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightFromBracket,
  faCommentDots,
  faCircleXmark,
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/components/_navbar.scss";
import "../styles/components/_responsive.scss";

const NavBar = () => {
  //utilisation de la fonction modal afin de créer une fenêtre pop-up en utilisant le hook useState.
  const [modalPost, setModalPost] = useState(false);

  // puisque setModal est false il devient true et inversement
  const toggleModalPost = () => {
    setModalPost(!modalPost);
  };

  //On empêche de scroller lorsque le popup apparait avec un overflow-y: hidden en css
  if (modalPost) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div>
      <header>
        <nav>
          <NavLink className="ctn-logo" to="/dashboard">
            <img src={logo} className="logo" alt="logo groupomania" />
          </NavLink>
          <div className="icons">
            <FontAwesomeIcon
              className="icon-navbar"
              icon={faCommentDots}
              onClick={toggleModalPost}
            />
            <NavLink className="icon-spe" to="/profil">
              <FontAwesomeIcon className="icon-navbar" icon={faUser} />
            </NavLink>
            <FontAwesomeIcon
              className="icon-navbar"
              icon={faRightFromBracket}
            />
          </div>
        </nav>
      </header>

      {/* Implémentation du "short circuit condition" afin de montrer ou cacher les éléments lorsque la condition (modal) est remplie.
      Peut etre considéré comme une version minifié d'un opérateur ternaire. */}
      {modalPost && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <div className="modal-icons">
              {/* ajout de fichier image */}
              <FontAwesomeIcon className="addImg-modal" icon={faFolderPlus} />
              {/* fermeture du modal */}
              <FontAwesomeIcon
                className="close-modal"
                onClick={toggleModalPost}
                icon={faCircleXmark}
              />
            </div>

            {/* message à publier */}
            <textarea
              id="post"
              name="post"
              rows="5"
              cols="33"
              placeholder="Que voulez-vous partager ?"
              required
            ></textarea>
            <button type="button" className="btn">
              Publier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
