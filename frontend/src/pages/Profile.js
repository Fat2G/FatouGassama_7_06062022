import { useEffect, React } from "react";
import NavBar from "../components/NavBar";
import UserProfile from "../components/UserProfile";

const Profile = () => {
  useEffect(() => {
    // Utilisation du hook d'effet en enlevant la classe non voulue au body au profit d'une nouvelle classe.
    document.body.classList.remove("login","signup");
    document.body.classList.add("dashboard","profile");
  }, []);

  return (
    <div>
      <NavBar />
      <UserProfile />
    </div>
  );
};

export default Profile;
