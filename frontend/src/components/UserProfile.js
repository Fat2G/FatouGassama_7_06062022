import { React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import "../styles/pages/_userProfile.scss";

const UserProfile = () => {
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
          <button type="button" className="btn">
            Supprimer le compte
          </button>
        </section>
      </main>
    </div>
  );
};

export default UserProfile;
