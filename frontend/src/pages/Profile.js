import { useEffect, useState, React } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import UserProfile from "../components/profil/UserProfile";

const Profile = () => {
  useEffect(() => {
    // Utilisation du hook d'effet en enlevant la classe non voulue au body au profit d'une nouvelle classe.
    document.body.classList.remove("login", "signup");
    document.body.classList.add("dashboard", "profile");
  }, []);

  // vérification de la connection utilisateur
  const [isAuth, setIsAuth] = useState(true);
  useEffect(() => {
    const isLogged = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          if (res.status === 200) {
            setIsAuth(isAuth);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsAuth(!isAuth);
        });
    };
    isLogged();
  }, [isAuth]);

  return (
    <div>
      {/* si l'utilisateur a un token il aura accès au profil utilisateur, si non il sera redirigé vers la page de connexion */}
      {isAuth ? (
        <div>
          <NavBar />
          <UserProfile />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default Profile;
