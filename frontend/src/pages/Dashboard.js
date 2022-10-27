import { useEffect, useState, React } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import BackToTopButton from "../components/utils/BackToTopButton";
import FilActu from "../components/dashboard/FilActu";
import { useDispatch } from "react-redux";
import { getUser } from "../actions/user.actions";
import { getUsers } from "../actions/users.actions";
import { getPosts } from "../actions/post.actions";

const Dashboard = () => {
  // Utilisation du hook d'effet en enlevant la classe non voulue au body au profit d'une nouvelle classe.
  useEffect(() => {
    document.body.classList.remove("signup", "login", "profile");
    document.body.classList.add("dashboard");
  }, []);

  // utilisation du hook useDispatch pour répartir les actions
  const dispatch = useDispatch();
  dispatch(getUsers());
  dispatch(getPosts());
  
  // vérification de la connection utilisateur
  const [isAuth, setIsAuth] = useState(true);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const isLogged = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          if (res.status === 200) {
            setUserId(res.data);
            setIsAuth(isAuth);
          }
        })
        .catch((err) => {
          console.log("Pas de token ! " + err);
          setIsAuth(!isAuth);
        });
    };
    isLogged();
    if (userId) dispatch(getUser(userId));
  }, [isAuth, userId, dispatch]);

  return (
    <div>
      {/* si l'utilisateur a un token il aura accès au dashboard, si non il sera redirigé vers la page de connexion */}
      {isAuth ? (
        <div>
          <NavBar />
          <FilActu />
          <BackToTopButton />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default Dashboard;
