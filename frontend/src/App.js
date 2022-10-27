import { useEffect, useState, React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Context } from "./components/Context";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

// import des pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

function App() {
  const [userId, setUserId] = useState(null);
  // utilisation du hook useDispatch pour répartir les actions
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async() => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUserId(res.data);
        })
        .catch((err) => console.log("Pas de token ! "));
    };
    getToken();
    // si l'userId existe il y aura un dispatch de la fonction getUser et est mis à jour à chaque fois que la valeur de userId évolue
    if (userId) dispatch(getUser(userId));    
  }, [userId, dispatch]);

  return (
    <Context.Provider value={userId}>
      {/* BrowserRouter englobe toute l'application */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inscription" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profil" element={<Profile />} />
          {/* Si l'url rentré ne correspond à rien de déclaré, l'utilisateur est renvoyé a la page d'accueil */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
