import { useState, React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import "../styles/pages/_userProfile.scss";
import "../styles/components/_responsive.scss";
import ModalDelAccount from "./ModalDelAccount";

const UserProfile = () => {
  const [delButton, setdelButton] = useState(false);

  const toggleDelButton = () => {
    setdelButton(!delButton);
  };

  return (
    <div>
      <main>
        <section className="card-profile">
          <div className="icon-profile">
            <div>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="icon-profile-add">
              <FontAwesomeIcon icon={faCirclePlus} />
            </div>
          </div>

          <h1> Identifiant </h1>
          <h2> test@test.fr </h2>
          <h3> Compte créé le XX/XX/XXXX </h3>
          <button type="button" className="btn" onClick={toggleDelButton}>
            Supprimer le compte
          </button>
        </section>
      </main>

      {/* Implémentation du "short circuit condition" afin de montrer ou cacher les éléments lorsque la condition du modal est remplie.
      Peut etre considéré comme une version minifié d'un opérateur ternaire. */}
      {delButton && (
        <ModalDelAccount/>
      )}
    </div>
  );
};

export default UserProfile;
