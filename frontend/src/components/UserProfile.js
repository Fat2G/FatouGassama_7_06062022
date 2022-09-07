import { useState, React } from "react";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import ModalDelAccount from "./ModalDelAccount";
import { dateParser } from "./TimeFormat";

const UserProfile = () => {
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.userError);

  // Suppression du compte
  const [delButton, setdelButton] = useState(false);

  const toggleDelButton = () => {
    setdelButton(!delButton);
  };

  return (
    <div>
      <main>
        <h1> Profil de {userData.username}</h1>
        <section className="card-profile">
          <div className="profile-img">
            <img src={userData.picture} alt="profil utilisateur" />
          </div>
          <UploadImg />
          <div className="error">
            <p>{error.maxSize}</p>
            <p>{error.format}</p>
          </div>
          <h3> Compte créé le {dateParser(userData.createdAt)} </h3>
          <button type="button" className="btn" onClick={toggleDelButton}>
            Supprimer le compte
          </button>
        </section>
      </main>

      {/* Implémentation du "short circuit condition" afin de montrer ou cacher les éléments lorsque la condition du modal est remplie.
      Peut etre considéré comme une version minifié d'un opérateur ternaire. */}
      {delButton && <ModalDelAccount />}
    </div>
  );
};

export default UserProfile;
