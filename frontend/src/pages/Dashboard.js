import { useEffect, React } from "react";
import NavBar from "../components/NavBar";
import BackToTopButton from "../components/utils/BackToTopButton";
import FilActu from "../components/FilActu";

const Dashboard = () => {
  // Utilisation du hook d'effet en enlevant la classe non voulue au body au profit d'une nouvelle classe.
  useEffect(() => {
    document.body.classList.remove("signup", "login", "profile");
    document.body.classList.add("dashboard");
  }, []);

  return (
    <div>
      <NavBar />
      <FilActu />
      <BackToTopButton />
    </div>
  );
};

export default Dashboard;
