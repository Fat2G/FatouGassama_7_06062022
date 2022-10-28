import { useState, React } from "react";
import { useSelector } from "react-redux";
import UploadImg from "../profil/UploadImg";
import ModalDelAccount from "../profil/ModalDelAccount";
import { dateFormat } from "../utils/DateFormat";

const UserProfile = () => {
  const userData = useSelector((state) => state.userReducer);

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
          <h3> Compte créé le {dateFormat(userData.createdAt)} </h3>
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
